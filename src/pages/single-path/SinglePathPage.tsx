import { useParams } from 'react-router-dom'
import PageWrapper from '../../components/page-wrapper/PageWrapper'
import PathSection from '../../components/path-section/PathSection'
import { SwaggerData } from '../../types'

interface PathPageProps {
  data: SwaggerData | null
  loading: boolean
  error: boolean
}

const PathPage = ({ loading, error, data }: PathPageProps) => {
  let { id } = useParams()

  const node = data?.pathsById[id!]

  return (
    <PageWrapper loading={loading} error={error}>
      {node && (
        <PathSection methods={node.methods} path={node.path} id={node.id} />
      )}
    </PageWrapper>
  )
}

export default PathPage
