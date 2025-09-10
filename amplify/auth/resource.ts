import { defineAuth } from '@aws-amplify/backend';
import { echoServiceFn } from '../data/resource';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
    access: (allow) => [
        allow.resource(echoServiceFn).to(["listUsers", "listUsersInGroup"])
    ],
});
