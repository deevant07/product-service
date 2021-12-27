import 'source-map-support/register';
import requestConstraints from './constraints/create.json';
import { DeviceModelRepoImpl } from 'src/repo/DeviceModelRepo';
import DeviceModel from 'src/models/device.model';
import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { validateAgainstConstraints } from 'src/utils/util';
import ResponseModel from 'src/models/response.model';
import { StatusCode } from 'src/enums/status.enums';

export const deviceModelPut: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  
    // Initialize response variable
    let response: ResponseModel;

    const deviceModelRepo = new DeviceModelRepoImpl();
    const requestData = JSON.parse(event.body);
    return validateAgainstConstraints(requestData, requestConstraints).then( async() => {
        const deviceModel: DeviceModel = Object.assign(new DeviceModel, requestData);
        console.log(deviceModel);
        await deviceModelRepo.save(deviceModel);
        return deviceModel.deviceType;
    }).then((deviceType) => {
        response = new ResponseModel({ deviceType }, 200, 'Device Model successfully created');
    }).catch((error) => {
        // Set Error Response
        console.error(error);
        response = (error instanceof ResponseModel) ? error : new ResponseModel({}, StatusCode.ERROR, 'Device Model cannot be created');
    }).then(() => {
        return response.generate();
    });
}