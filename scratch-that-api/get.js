import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-libs";

export async function main(event, context) {
  const params = {
    TableName: "notes",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    //console.log(params);
    const result = await dynamoDbLib.call("get", params);
    //console.log("result", result);
    if (result.Item) {
      //Return the retrieved item
      return success(result.item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
