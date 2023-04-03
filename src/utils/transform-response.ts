import { PathNode, SwaggerData, SwaggerDataDTO } from '../types'
import JsonRefs from 'json-refs'

const transformPathToNavighationId = (path: string) => {
  let transformedPath = ''

  for (let i = 1; i < path.length; i++) {
    if (path[i] === '/') {
      transformedPath += '_'
    } else if (path[i] === '{' || path[i] === '}') {
      continue
    } else {
      transformedPath += path[i]
    }
  }

  return transformedPath
}

export const transformDTO = async (
  data: SwaggerDataDTO,
): Promise<SwaggerData> => {
  //TODO: research better ways for JSON schema handling
  const dereferenced = await JsonRefs.resolveRefs(getDeepCopy(data))

  const paths = (dereferenced.resolved as SwaggerDataDTO).paths
  const groupedPaths = new Map()
  const pathsById: Record<string, PathNode> = {}

  Object.keys(paths)
    .sort((a, b) => a.localeCompare(b))
    .forEach((path) => {
      const [_, parent] = path.split('/')
      const parentNode: PathNode[] = groupedPaths.get(parent)

      const id = transformPathToNavighationId(path)

      const childNode: PathNode = {
        methods: paths[path],
        path,
        id,
      }

      pathsById[id] = childNode

      if (!parentNode) {
        groupedPaths.set(parent, [childNode])
      } else {
        groupedPaths.get(parent).push(childNode)
      }
    })

  return {
    info: getDeepCopy(data.info),
    groupedPaths: Array.from(groupedPaths.entries()),
    pathsById,
  }
}

function getDeepCopy(obj: Record<string, any>) {
  return JSON.parse(JSON.stringify(obj))
}
