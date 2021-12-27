import 'source-map-support/register';
import requestConstraints from './constraints/get.json';
import { DeviceModelRepoImpl } from 'src/repo/DeviceModelRepo';
import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from 'aws-lambda';
import { validateAgainstConstraints } from 'src/utils/util';
import ResponseModel from 'src/models/response.model';
import { StatusCode } from 'src/enums/status.enums';

export const deviceModelGet: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  
    // Initialize response variable
    let response: ResponseModel;

    const deviceModelRepo = new DeviceModelRepoImpl();
    const requestData = JSON.parse(event.body);
    return validateAgainstConstraints(requestData, requestConstraints).then( async() => {
        const result = await deviceModelRepo.findByDeviceTypeAndVersion(requestData.deviceType, requestData.version);
        console.log("result for get: ", JSON.stringify(result));
        return result;
    }).then((record) => {
        response = new ResponseModel({ record }, 200, 'Device Model');
    }).catch((error) => {
            // Set Error Response
            response = (error instanceof ResponseModel) ? error : new ResponseModel({}, StatusCode.ERROR, 'Device Model not available');
    }).then(() => {
        return response.generate();
    });
}