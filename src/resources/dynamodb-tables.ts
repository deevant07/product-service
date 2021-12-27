import serviceConfig from '../../service-config.json'
export default {
    DeviceModelTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: serviceConfig.devModelTable,
            
            AttributeDefinitions: [
                { AttributeName: 'deviceType', AttributeType: 'S' },
                { AttributeName: 'version', AttributeType: 'N' }
            ],
            KeySchema: [
                { AttributeName: 'deviceType', KeyType: 'HASH' },
                { AttributeName: 'version', KeyType: 'RANGE' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: serviceConfig.devModelTableRCU,
                WriteCapacityUnits: serviceConfig.devModelTableWCU
            }/* ,
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'list_index',
                    KeySchema: [
                        { AttributeName: 'listId', KeyType: 'HASH' },
                    ],
                    Projection: { // attributes to project into the index
                        ProjectionType: 'ALL' 
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: '${self:custom.table_throughput}',
                        WriteCapacityUnits: '${self:custom.table_throughput}'
                    },
                }
            ] */
        }
    }
}