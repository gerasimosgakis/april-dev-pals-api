import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const bodyWithId = JSON.parse(event.body);
  bodyWithId._id = uuid.v1();
  bodyWithId.userId = event.requestContext.identity.cognitoIdentityId;
  const data = bodyWithId;
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "posts",
    Key: {
      postId: event.pathParameters.id
    },
    UpdateExpression: "SET comments=list_append(:comment, comments)",
    ExpressionAttributeValues: {
      ":comment": [data]
    }
  };

  try {
    console.log(data);
    await dynamoDbLib.call("update", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
