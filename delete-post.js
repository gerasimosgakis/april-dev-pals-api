import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "posts",
    Key: {
      postId: event.pathParameters.id
    }
  };

  try {
    console.log(event.pathParameters.id);
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (err) {
    console.log(err);
    return failure({ status: false });
  }
}
