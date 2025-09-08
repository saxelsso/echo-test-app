import type { Handler } from 'aws-lambda';
import { Amplify } from "aws-amplify";
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { generateClient } from "aws-amplify/data";
import { env } from "$amplify/env/handler";
import { Schema } from '../../../amplify/data/resource';
 
const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: Schema["echoService"]["functionHandler"] = async (event) => {
    // arguments typed from `.arguments()`
    const { echoString } = event.arguments

    const todos = await client.models.Todo.list() // use this Data client for CRUDL requests
    console.log("Todos in the database:", todos);
    console.log("Echoing:", echoString + env.AWS_REGION);
    
    return `Hello, ${echoString}! Number of todos: ${todos.data.length}`;
}