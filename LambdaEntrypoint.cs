using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

namespace TodoListApp
{
    public class LambdaEntryPoint
    {
        public async Task<string> FunctionHandlerAsync(APIGatewayProxyRequest request, ILambdaContext context)
        {
            await Task.Delay(1000); // Simulate some asynchronous operation
            return "Hello, Serverless!";
        }
    }
}
