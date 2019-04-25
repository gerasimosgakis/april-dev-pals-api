import AWS from "aws-sdk";

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues: true // in order to accept empty strings
  });

  return dynamoDb[action](params).promise();
}
