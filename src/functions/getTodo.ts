import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async(event) => {
    const { userid } = event.pathParameters;

    const response =await document.scan({
        TableName: "todos",
        FilterExpression: "userid = userid",
        ExpressionAttributeValues: {
            "userid": userid
        },
    }).promise();

    if(response.Items.length === 0) {
        return{
            statusCode: 400,
            body: JSON.stringify({
                message: "Lista Vazia",
            }),
        };
    }

    return{
        statusCode: 200,
        body: JSON.stringify(response.Items),
    };
};