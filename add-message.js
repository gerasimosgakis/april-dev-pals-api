import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  // const bodyWithId = JSON.parse(event.body);
  // bodyWithId.message._id = uuid.v1();
  // const data = bodyWithId;
  const data = JSON.parse(event.body);

  const params = {
    TableName: "profiles",
    Key: {
      userId: event.pathParameters.id
    },
    UpdateExpression: "SET messages = list_append(:message, messages)",
    ExpressionAttributeValues: {
      ":message": [data.message]
    }
  };

  try {
    console.log(params);
    await dynamoDbLib.call("update", params);
    return success(params.Item);
  } catch (e) {
    return failure({ e });
  }
}
