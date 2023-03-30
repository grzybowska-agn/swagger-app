type ContactInfoKeys = 'e-mail'
type LicenceInfoKeys = 'name' | 'url'

export interface SwaggerInfo {
  description: string
  version: string
  title: string
  termsOfService: string
  contact: Record<ContactInfoKeys, string>
  license: Record<LicenceInfoKeys, string>
}

export interface SwaggerData {
  info: SwaggerInfo
  paths: any[]
}
