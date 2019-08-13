export function success(body) {
  return buildResponse(200, body);
}

export function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
  // Set response headers to enable CORS (Cross-Origin Resource Sharing)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  return {
    statusCode: statusCode,
    headers: headers,
    body: JSON.stringify(body)
  };
}
