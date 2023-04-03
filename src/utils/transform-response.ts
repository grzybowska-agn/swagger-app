import { PathNode, SwaggerData, SwaggerDataDTO } from '../types'
import JsonRefs from 'json-refs'

//TODO: research better ways for JSON schema handling
const dereference = async (data: SwaggerDataDTO) => {
  const { resolved } = await JsonRefs.resolveRefs(data)
  const { info, paths } = resolved as SwaggerDataDTO

  return { info, paths }
}

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
  const { paths, info } = await dereference(data)

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
    info,
    groupedPaths: Array.from(groupedPaths.entries()),
    pathsById,
  }
}
