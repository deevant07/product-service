import 'source-map-support/register';
import requestConstraints from './constraints/list.json';
import { DeviceModelRepoImpl } from 'src/repo/DeviceModelRepo';
import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { validateAgainstConstraints } from 'src/utils/util';
import ResponseModel from 'src/models/response.model';
import { StatusCode } from 'src/enums/status.enums';

export const deviceModelList: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  
    // Initialize response variable
    let response: ResponseModel;

    const deviceModelRepo = new DeviceModelRepoImpl();
    const requestData = JSON.parse(event.body);
    return validateAgainstConstraints(requestData, requestConstraints).then( async() => {
        const result = await deviceModelRepo.findByDeviceType(requestData.deviceType);
        return result;
    }).then((list) => {
        response = new ResponseModel({ list }, 200, 'Device Model List');
    }).catch((error) => {
            // Set Error Response
            response = (error instanceof ResponseModel) ? error : new ResponseModel({}, StatusCode.ERROR, 'Device Model List not available');
    }).then(() => {
        return response.generate();
    });
}