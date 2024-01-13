import {EegRegister, EegUsers, PontonRegister} from "../model/eeg.model";
import {useAuth} from "react-oidc-context";
import {User, UserManager} from "oidc-client-ts";
import {authService} from "./auth.service";


const ADMIN_API_SERVER = process.env.REACT_APP_ADMIN_SERVER_URL;

export class EegService {

  public constructor(authService: UserManager) {
  }


  // private getUser() {
  //   const oidcStorage = sessionStorage.getItem(`oidc.user:https://login.ourproject.at/auth/realms/VFEEG/:at.ourproject.vfeeg.admin`)
  //   if (!oidcStorage) {
  //     return null;
  //   }
  //
  //   return User.fromStorageString(oidcStorage);
  // }

  private async getUser() {
    return authService.getToken()
  }
  private getSecureHeaders(tenant: string, token?: string) {
    return {'Authorization': `Bearer ${token}`, "tenant": tenant}
  }

  private async withSecureHeaders(headers: Record<string, string>, tenant?: string) {
    const token = await this.getUser()
    let secHeaders: Record<string, string> = { 'Authorization': `Bearer ${token}`}
    if (tenant) {
      secHeaders = {"tenant": tenant, ...secHeaders}
    }
    return { ...secHeaders, ...headers}
  }

  private handleErrors(response: Response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  async registerEeg(eeg: EegRegister): Promise<EegRegister> {
    const token = await this.getUser()
    return await fetch(`${ADMIN_API_SERVER}/eeg/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(eeg)
    }).then(this.handleErrors).then(async res => {
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
    });
  }

  async registerPonton(ponton: PontonRegister): Promise<EegRegister> {
    return await fetch(`${ADMIN_API_SERVER}/eeg/ponton`, {
      method: 'POST',
      headers: await this.withSecureHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(ponton)
    }).then(this.handleErrors).then(async res => {
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
    });
  }
  async getEegUser(tenant: string): Promise<EegUsers[]> {
    const token = await this.getUser()
    // const token = "1234"
    return await fetch(`${ADMIN_API_SERVER}/eeg/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(this.handleErrors).then(async res => {
      if (res.status === 200) {
        const data = await res.json();
        return data.users;
      }
    });
  }
}
export const eegService = new EegService(authService);

export const useToken = () => {
  const auth = useAuth()

  const token = auth.user?.access_token

  return token
}