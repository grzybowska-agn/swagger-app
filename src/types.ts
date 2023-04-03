export interface SwaggerDataDTO {
  info: SwaggerInfo
  paths: Record<string, PathMethod>
}

export interface SwaggerData {
  info: SwaggerInfo
  groupedPaths: PathGroup[]
  pathsById: Record<string, PathNode>
}

type PathGroup = [string, PathNode[]]

export type PathMethod = Record<HttpRequestMethod, Path>

export interface PathNode {
  methods: PathMethod[]
  path: string
  id: string
}

export interface SwaggerInfo {
  description: string
  version: string
  title: string
  termsOfService: string
  contact: Record<ContactInfoKeys, string>
  license: Record<LicenceInfoKeys, string>
}

type ContactInfoKeys = 'e-mail'

type LicenceInfoKeys = 'name' | 'url'

interface PathResponseHeader {
  type: DataType
  format: DataFormat
  description: string
}
interface PathResponse {
  description: string
  schema?: Schema
  headers?: Record<string, PathResponseHeader>
}

type StatusCode = string

interface SchemaItem {
  $ref: string
  type?: DataType
}

interface SchemaAdditionalProperties {
  type: DataType
  format?: DataFormat
}

type Schema =
  | SchemaItem
  | {
      type?: DataType
      items?: SchemaItem[]
      additionalProperties?: SchemaAdditionalProperties
    }

type DataFormat = 'int64' | 'date-time' | 'int32'

type DataType = 'integer' | 'string' | 'file' | 'array'

type ParameterSource = 'path' | 'formData' | 'body' | 'query'

interface Parameter {
  name: string
  in: ParameterSource
  required: boolean
  description?: string
  type?: DataType
  format?: DataFormat
  schema?: Schema
  maximum?: number
  minimum?: number
}

type CollectionFormat = 'multi'

type ContentType =
  | 'application/json'
  | 'application/xml'
  | 'multipart/form-data'
interface Path {
  tags: string[]
  summary: string
  description: string
  operationId: string
  consumes?: ContentType[]
  produces: ContentType[]
  parameters: Parameter[]
  responses: Record<StatusCode | 'default', PathResponse>
  security?: Record<string, string[]>
  items?: { type: DataType }
  collectionFormat?: CollectionFormat
}

export type HttpRequestMethod = 'get' | 'post' | 'put' | 'delete'
