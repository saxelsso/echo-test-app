import { Amplify } from "aws-amplify";
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { generateClient } from "aws-amplify/data";
import {
    CognitoIdentityProviderClient,
    AdminAddUserToGroupCommand,
    ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { env } from "$amplify/env/echo-service";
import { Schema } from '../data/resource';
 
const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

const authClient = new CognitoIdentityProviderClient();

export const handler: Schema["echoService"]["functionHandler"] = async (event) => {
    // arguments typed from `.arguments()`
    const { echoString } = event.arguments;
    const todos = await client.models.Todo.list() // use this Data client for CRUDL requests
    console.log("Todos in the database:", todos);
    console.log("Echoing:", echoString + env.AWS_REGION);

    const input = {
        AttributesToGet: [
            "email",
            "sub"
        ],
        UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID
    };

    const command = new ListUsersCommand(input);
    const response = await authClient.send(command);

    console.log(response);

    return `Hello, ${echoString}! Number of todos: ${todos.data.length}`;
}