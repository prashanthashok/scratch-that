import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-libs";

export async function main(event, context) {
  const params = {
    TableName: "notes",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    console.log("params", params);
    const result = await dynamoDbLib.call("delete", params);
    console.log(result);
    return success({ status: true });
  } catch (e) {
    console.log("Exception occurred", e);
    return failure({ status: true });
  }
}
