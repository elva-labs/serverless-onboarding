import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "https://deno.land/x/lambda@1.46.3/mod.ts";

// deno-lint-ignore require-await
export async function handler(
  event: APIGatewayProxyEvent,
  _ctx: Context,
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Deno Lambda!",
      input: event,
    }),
  };
}
