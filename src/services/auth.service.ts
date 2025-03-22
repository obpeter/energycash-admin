import {UserManager, UserManagerSettings, WebStorageStateStore} from "oidc-client-ts";

// import {keycloakConfig} from "../keycloak";

// const keycloakConfig = {
//   url: "https://login.ourproject.at/auth/realms/VFEEG/",
//   client_id: "at.ourproject.vfeeg.admin",
//   // redirect_uri: "https://admin.eegfaktura.at"
//   redirect_uri: "http://localhost:3000",
// }

// const oidcConfig = {
//   authority: keycloakConfig.url,
//   client_id: keycloakConfig.client_id,
//   redirect_uri: keycloakConfig.redirect_uri,
//   // client_secret: keycloakConfig.client_secret,
//   automaticSilentRenew: false,
//   revokeAccessTokenOnSignout: true,
//   userStore: new WebStorageStateStore({
//     store: sessionStorage
//   }),
// } as UserManagerSettings;


export class AuthService extends UserManager {

  constructor(settings: UserManagerSettings) {
    super(settings);
  }

  public async getToken() {
    const user = await this.getUser()
    if (user && user.expires_in) {
      const expiresIn = user.expires_in
      if (expiresIn < 30) {
        await this.signinSilent()
        return user.access_token
      }
      return user.access_token
    }
    throw new Error("Not authorized")
  }

  public async login() {
    return this.signinRedirect()
  }

  public async logout() {
    return this.signoutRedirect()
  }
}

// export const authService = new AuthService(oidcConfig)