import { addToMap, writeMapToJson } from "../store_access_token";

// Get the access token from Web local storage then store it to json file
export function storeAccessToken() {
    cy.window().then((win) => {
        const storedLoginResponse = win.localStorage.getItem("loginResponse");
        const loginResponse = JSON.parse(
            storedLoginResponse || ""
        ) as LoginResponse;
        const accessToken = loginResponse.accessToken;
        console.log("*****loginResponse.accessToken --- " + accessToken);
        const map0=addToMap("accessToken",accessToken);
        writeMapToJson(map0);
    });
}