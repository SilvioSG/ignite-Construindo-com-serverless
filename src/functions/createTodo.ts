import { APIGatewayProxyHandler } from "aws-lambda";
import { V4 as uuidv4} from "uuid";
import { document } from "../utils/dynamodbClient";

interface ICreateTodo {
    title: string;
    deadline: string;
};

export const handler: APIGatewayProxyHandler = async (event) => {
    const { title, deadline} = JSON.parse(event.body) as ICreateTodo;
    const { userid } =event.pathParameters;

    const todo = {
        id: uuidv4(),
        userid,
        title,
        done: false,
        deadline: new Date(deadline).toUTCString(),
    };

    await document.put({
        TableName: "todos",
        Item: todo,
    })
    .promise()

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Create Todo",
            data: todo,
        }),
    };
};