import { useParams } from 'react-router-dom'
import PathSection from '../../components/organisms/path-section/PathSection'
import { SwaggerData } from '../../types'

interface PathPageProps {
  data: SwaggerData | null
}

const PathPage = ({ data }: PathPageProps) => {
  let { id } = useParams()
  const node = data?.pathsById[id!]

  //TODO: Add Back Button

  return (
    <>
      {node && (
        <PathSection
          methods={node.methods}
          path={node.path}
          id={node.id}
          disabledNavigation
        />
      )}
    </>
  )
}

export default PathPage
