
const {authServerUrl, clientId, realm} = window['authConfig']

export const keycloakConfig = {
    url: `${authServerUrl.replace(/\/+$/, "")}/realms/${realm}/`,
    client_id: clientId,
    // redirect_uri: "https://admin.eegfaktura.at"
    redirect_uri: "http://localhost:3000"
}