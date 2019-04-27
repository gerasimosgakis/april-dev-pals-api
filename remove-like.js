import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  const documentClient = new AWS.DynamoDB.DocumentClient();
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: "posts",
    Key: {
      postId: event.pathParameters.id
    },
    UpdateExpression: `DELETE likes :userId`,
    ExpressionAttributeValues: {
      ":userId": documentClient.createSet([data.userId])
    }
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (err) {
    console.log(err);
    return failure({ err });
  }
}
