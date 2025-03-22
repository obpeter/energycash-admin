
export interface Eeg {
  tenant: string,
  name: string;
  rcNumber: string;
  salesTax: string;
  settlement: string;
  description: string;
  communityId: string;
  contact: Contact;
  accountInfo: AccountInfo;
  online: boolean;
}

export interface EegBusiness {
  businessInfo: {
    legal: 'verein' | 'genossenschaft' | 'gesellschaft';
    taxNumber: string;
    vatNumber: string;
    settlementInterval: 'MONTHLY' | "ANNUAL" | "BIANNUAL" | "QUARTER";
    businessNr: string;
  }
}

export interface EegOwner {
  user: {
    username: string
    password: string
    confirmPassword: string
    firstname: string
    lastname: string
    email: string
  }
}

export interface EegGrid {
  grid: {
    id: string;
    name: string;
    area: 'LOCAL' | "REGIONAL" | "GEA" | "BEG";
    allocation: "DYNAMIC" | "STATIC";
  }
}

export interface EegPonton {
  pontonInfo: {
    host: string
    port: number
    username: string
    password: string
    confirmPassword: string
    domain: string
    pontonCommType: string
  }
}

export type EegRegister = Eeg & EegOwner & EegPonton & EegBusiness & EegGrid

export interface EegTenant { tenant: string}
export type PontonRegister = EegTenant & EegPonton

export interface Address {
  street: string;
  streetNumber: string;
  zip: string;
  city: string;
  type: "BILLING" | "RESIDENCE"
}

export interface Contact {
  owner: string;
  street: string;
  streetNumber: string;
  zip: string;
  city: string;
  phone: string;
  web: string;
  email: string;
  contactPerson: string;
}

export interface AccountInfo {
  iban: string;
  owner: string;
  sepa: boolean;
}

export interface Optionals {
  website: string;
}

export interface EegRateItem {
  name: RateTypeEnum;
  value: string;
  unit: string;
  optional: boolean;
}

export interface EegRate {
  id: string;
  name: string;
  vat: number;
  type: "EEG" | "EZP" | "VZP";
  items: EegRateItem[];
}

export enum RateTypeEnum {
  AHEAD = "Vorauszahlung",
  DISCOUNT = "Rabatt",
  CENTPERKWH = "Cent pro kWh",
  INCLUDEKWH = "Inklusive kWh",
  DISCOUNTINPERCENT = "Rabatt in %",
  FIXSUM = "Pauschalbetrag",
  FIXSUM1 = ""
}

export const memberType: EegRateItem[] = [
  {name: RateTypeEnum.AHEAD, value: "", unit: "€", optional: true},
  {name: RateTypeEnum.DISCOUNT, value: "", unit: "%", optional: true},
]

export const vzpType: EegRateItem[] = [
  {name: RateTypeEnum.CENTPERKWH, value: "", unit: "€", optional: false},
  {name: RateTypeEnum.INCLUDEKWH, value: "", unit: "kWh", optional: true},
  {name: RateTypeEnum.DISCOUNTINPERCENT, value: "", unit: "%", optional: true},
]

export const ezpType: EegRateItem[] = [
  {name: RateTypeEnum.FIXSUM, value: "", unit: "€", optional: false},
  {name: RateTypeEnum.CENTPERKWH, value: "", unit: "€" , optional: true},
]

export interface EegTariff {
  id: string;
  name: string;
  type: "EEG" | "EZP" | "VZP" | "AKONTO";
  billingPeriod?: string
  useVat?: boolean
  vatInPercent?: string
  accountNetAmount?: string
  accountGrossAmount?: string
  participantFee?: string
  baseFee?: string
  businessNr?: string
  centPerKWh?: string
  freeKWH?: string
  discount?: string
}

export enum MONTHNAME {
  Januar = 1,
  Februar,
  März,
  April,
  Mai,
  Juni,
  Juli,
  August,
  September,
  Oktober,
  November,
  Dezember
}

export enum MONTHNAMESHORT {
  Jan = 1,
  Feb,
  Mär,
  Apr,
  Mai,
  Jun,
  Jul,
  Aug,
  Sep,
  Okt,
  Nov,
  Dez
}

export interface EdaProcess {
  name: string
  description: string
  type: 'CR_REQ_PT' | 'EC_REQ_ONL'
}


export class Message {
  constructor(public properties: { [key: string]: any | any[]; }) {
  }

  private getValue = (prop: string): string => this.properties ? this.properties[prop] ? this.properties[prop] : "-" : "-"

  public get type() {
    return this.getValue("type")
  }
  public get meteringPoint() {
    // console.log("get MeteringPoint", this.properties["meteringPoint"])
    // console.log("get MeteringPoints", this.properties["meteringPoints"])
    if (this.properties) {
      return this.properties["meteringPoint"] ? this.properties["meteringPoint"] : this.properties["meteringPoints"] ? this.properties["meteringPoints"].join() : "-"
    }
    return "-"
  }
  public get responseCode() {
    return this.getValue("responseCode")
  }
}

export interface EegNotification {
  id: number;
  date: string;
  type: 'ERROR' | 'MESSAGE' | 'NOTIFICATION';
  message: Message;
}


export interface EegUsers {
  firstname: string;
  lastname: string;
  email: string;
}

export interface EegMember {
  name: string;
  tenant: string;
  description: string;
  legal: string;
  area: "LOCAL" | "REGIONAL" | "BEG" | "GEA";
  gridOperatorName: string;
  gridOperatorId: string;
  contactPerson: string;
  settlementInterval: 'MONTHLY' | "ANNUAL" | "BIANNUAL" | "QUARTER";
  allocationMode: "DYNAMIC" | "STATIC"
  online: boolean;
}
