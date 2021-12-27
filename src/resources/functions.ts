export default {
    deviceModelPut: {
        handler: 'handler.deviceModelPut',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'device-model/register',
                    cors: true
                }
            }
        ]
    },
    deviceModelList: {
        handler: 'handler.deviceModelList',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'device-model/list',
                    cors: true
                }
            }
        ]
    },
    deviceModelGet: {
        handler: 'handler.deviceModelGet',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'device-model/get',
                    cors: true
                }
            }
        ]
    }
}