import functions from './src/resources/functions'
import type { AWS } from '@serverless/typescript';


import serviceConfig from 'service-config.json';
import dynamodbTables from 'src/resources/dynamodb-tables';

const serverlessConfiguration: AWS = {
  service: 'product',
  frameworkVersion: '2',
  custom: {
    service: serviceConfig,
    stage: '${opt:stage, self:provider.stage}',
    region: 'us-east-1',
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8008,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        noStart: true
      }
    },
    ['serverless-offline']:{
      httpPort: 3000,
        babelOptions: {
          presets: ["env"]
        }
    }
  },
  
  package:{
    individually: true
  },
  plugins: [
    'serverless-bundle',
    'serverless-offline',
    'serverless-dotenv-plugin',
    'serverless-dynamodb-local'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      STAGE: '${self:custom.stage}',
      REGION: '${self:custom.region}',
      DYNAMODB_LOCAL_STAGE: '${env:DYNAMODB_LOCAL_STAGE}',
      DYNAMODB_LOCAL_ACCESS_KEY_ID: '${env:DYNAMODB_LOCAL_ACCESS_KEY_ID}',
      DYNAMODB_LOCAL_SECRET_ACCESS_KEY: '${env:DYNAMODB_LOCAL_SECRET_ACCESS_KEY}',
      DYNAMODB_LOCAL_ENDPOINT: '${env:DYNAMODB_LOCAL_ENDPOINT}'
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
            'dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem'
        ],
        Resource: [
          {"Fn::GetAtt": [ 'DeviceModel', 'Arn' ]}
          
        ]
      }
    ]
  },
  // import the function via paths
  functions: functions,
  resources: {
    Resources: dynamodbTables
  }
};

module.exports = serverlessConfiguration;
