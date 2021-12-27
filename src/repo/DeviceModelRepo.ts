import {
    DataMapper,
    QueryIterator,
} from '@aws/dynamodb-data-mapper';
import DeviceModel from '../models/device.model';
import * as AWS from 'aws-sdk';

// Interfaces
import IConfig from '../interfaces/config.interface';




const config: IConfig = { region: "us-east-1" };
if (process.env.STAGE === process.env.DYNAMODB_LOCAL_STAGE) {
    config.accessKeyId = process.env.DYNAMODB_LOCAL_ACCESS_KEY_ID; 
    config.secretAccessKey = process.env.DYNAMODB_LOCAL_SECRET_ACCESS_KEY; 
    config.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT;
    console.log(config);
}
AWS.config.update(config);
const client = new AWS.DynamoDB();
const mapper = new DataMapper({client});

interface DeviceModelRepo{
    findByDeviceType(deviceType: string): Promise<DeviceModel[]>;
    findByDeviceTypeAndVersion(deviceType: string, version: number): Promise<DeviceModel>;
    save(deviceModel: DeviceModel): Promise<DeviceModel>;
}

export class DeviceModelRepoImpl implements DeviceModelRepo{    
    async findByDeviceType (deviceType : string) : Promise<DeviceModel[]>{
        
        const results:  DeviceModel[]= new Array(1);   
        const iterator: QueryIterator<DeviceModel> = mapper.query(DeviceModel, {deviceType: deviceType});
        for await ( const item of iterator){
           // console.log(item);
            results.push(item);
        }
        return results;  
    } 
    async findByDeviceTypeAndVersion (deviceType : string, version: number) : Promise<DeviceModel>{
        
        const inp = new DeviceModel();
        inp.deviceType = deviceType;
        inp.version = version; 
        return mapper.get(inp);
    } 
    async save(deviceModel: DeviceModel): Promise<DeviceModel> {
        console.log("Dynamodb: ", client.config);
        return mapper.put(deviceModel);
    }   
}