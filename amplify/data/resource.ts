import { type ClientSchema, a, defineData, defineFunction } from "@aws-amplify/backend";

export const echoServiceFn = defineFunction({
    entry: '../functions/echo-service.ts',

});

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey()
    ]),

  echoService: a
        .mutation()
        .arguments({
            echoString: a.string()
        })
        .returns(a.string())
        .authorization(allow => [
            allow.publicApiKey(), // <-- add this
        ])
        .handler(a.handler.function(echoServiceFn)),
  })
  
  .authorization(allow => [
    allow.resource(echoServiceFn).to(['query', 'listen'])
  ]); // allow query and subscription operations but not mutations

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
    functions: { echoServiceFn },
});

