import {
    CognitoIdentityProviderClient,
    ListUsersCommand,
    AdminAddUserToGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';

export interface ListUsersInput {
    AttributesToGet: string[];
    UserPoolId: string;
}

export async function listCognitoUsers(
    authClient: CognitoIdentityProviderClient,
    input: ListUsersInput
) {
    const command = new ListUsersCommand(input);
    return await authClient.send(command);
}

// You can add more Cognito-related utility functions here, e.g.:
// export async function addUserToGroup(...) { ... }
