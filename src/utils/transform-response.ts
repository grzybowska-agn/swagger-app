import { SwaggerData, SwaggerDataDTO } from '../types'

export const transformDTO = (data: SwaggerDataDTO): SwaggerData => {
  const paths = getDeepCopy(data.paths)
  const pathsMap = new Map()

  Object.keys(paths)
    .sort((a, b) => a.localeCompare(b))
    .forEach((path) => {
      const [_, parent] = path.split('/')
      const parentNode = pathsMap.get(parent)
      const childNode = { methods: paths[path], path }

      if (!parentNode) {
        pathsMap.set(parent, [childNode])
      } else {
        parentNode.push(childNode)
      }
    })

  return {
    info: getDeepCopy(data.info),
    paths: Array.from(pathsMap.entries()),
  }
}

function getDeepCopy(obj: Record<string, any>) {
  return JSON.parse(JSON.stringify(obj))
}
