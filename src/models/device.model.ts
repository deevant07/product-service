import {
    attribute,
    hashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';
import { embed } from '@aws/dynamodb-data-mapper';
import serviceConfig from 'service-config.json'

export class ModelField{
    @attribute()
    name: string;
   
    @attribute()
    type: string;
    @attribute()
    unit: string;
    
    @attribute()
    rw: boolean;
    
    @attribute()
    reqd: boolean;

    @attribute()
    min: string;
    
    @attribute()
    max: string;
    
    @attribute()
    defaultVal: string;
   
    @attribute()
    visible: boolean;

    @attribute()
    alarm: boolean;
   
    @attribute()
    category: string;

    @attribute()
    cloud: boolean;
    
    @attribute({memberType: {type: 'String'}})
    allowedVals: Map<string, string>;
    
    @attribute()
    home: boolean;

}
export class DFieldRange{
    @attribute()
    low: string;

    @attribute()
    high: string;
    
    @attribute()
    stat: string;
    
    @attribute()
    colr: string;
}
export class ModelDField{
    @attribute()
    ref: string;
    
    @attribute()
    limit: string;
    
    @attribute()
    cond: string;
    
    @attribute()
    metStat: string;
    
    @attribute()
    metColr: string;
    
    @attribute()
    umetStat: string;
    
    @attribute()
    umetColr: string;
    
    @attribute()
    ranges: DFieldRange;
    
}
@table(serviceConfig.devModelTable)
export default class DeviceModel{

    @hashKey()
    deviceType: string;
    
    @rangeKey()
    version: number;

    @attribute({memberType: embed(ModelField)})
    fields: Map<string, ModelField>;
    
    @attribute({memberType: embed(ModelDField)})
    dField: Map<string, ModelDField>;
    
    @attribute()
    createdBy: string;
    
    @attribute()
    modifiedBy: string;
    
    @attribute()
    modifiedOn: number;
    
}


