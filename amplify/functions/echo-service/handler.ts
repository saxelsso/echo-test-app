//import { Amplify } from 'aws-amplify';
import type { Schema } from "../../data/resource"
//import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
//import { generateClient } from "aws-amplify/data";

import { env } from "$amplify/env/echoService";

//const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(
//  env
//);

/*
Amplify.configure(
  {   },
  {
    Auth: {
      credentialsProvider: {
        // instruct the client library to read credentials from the environment
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {
           
        },
      },
    },
  }
); */

//const client = generateClient<Schema>();

export const handler: Schema["echoService"]["functionHandler"] = async (event) => {
    // arguments typed from `.arguments()`
    const { echoString } = event.arguments

    //const todos = await client.models.Todo.list() // use this Data client for CRUDL requests
    //console.log("Todos in the database:", todos);
    console.log("Echoing:", echoString + env.AWS_REGION);
    return `Hello, ${echoString}!` + env.AWS_REGION;
}