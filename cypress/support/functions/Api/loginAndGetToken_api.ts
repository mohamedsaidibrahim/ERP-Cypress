import { AuthData } from "../../../e2e/authentication/data/auth_data";
import { addToMap, writeMapToJson } from "../store_access_token";

// Function to login and provide access token
export const loginAndGetTokenApi = () => {
    cy.request({
        method: 'POST',
        url: AuthData.loginUrl,
        body: {
            username: AuthData.tempMail,
            password: AuthData.pass
        }
    }).then((response) => {
        const accessToken = response.body.accessToken; // Assuming the access token is in the response body
        const updatedMap = addToMap('accessToken', accessToken);
        writeMapToJson(updatedMap);
    });
};