import React, {createContext, FC, ReactNode, useState} from "react";

interface EegTenant {
  rcNumber: string;
  roles: string[];
  name: string;
}

interface EegTenants {
  tenants: EegTenant[]
  setTenants: (tenants: string[]) => void
}

const initalState = {} as EegTenants

export const TenantContext = createContext(initalState)

const TenantProvider: FC<{children: ReactNode}> = ({children}) => {

  const [eegTenants, setEegTenants] = useState<EegTenant[]>([])

  const values = {
    tenants: eegTenants,
    setTenants: (tenants: string[]) => {
      setEegTenants(tenants.map(s => {
        const [tenant, roles, name] = s.split(":")
        const eegRoles = roles.split(";")
        console.log(tenant, eegRoles, name)
        return {rcNumber: tenant, roles: eegRoles, name: name} as EegTenant
      }))
    }
  }

  return (
    <TenantContext.Provider value={values}>
      {children}
    </TenantContext.Provider>
  )
}

export default TenantProvider