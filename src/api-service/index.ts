import { SwaggerData } from '../types'

const apiUrl = 'https://petstore.swagger.io/v2/swagger.json'

export const getSwaggerData = async (): Promise<SwaggerData> => {
  const response = await fetch(apiUrl)
  return response.json()
}
