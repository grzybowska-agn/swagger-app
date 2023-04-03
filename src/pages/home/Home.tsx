import ErrorMessage from '../../components/error-message/ErrorMessage'
import InfoBlock from '../../components/info-block/InfoBlock'
import Loader from '../../components/loader/Loader'
import PageWrapper from '../../components/page-wrapper/PageWrapper'
import PathSection from '../../components/path-section/PathSection'
import { SwaggerData } from '../../types'

interface HomeProps {
  data: SwaggerData | null
  loading: boolean
  error: boolean
}

const Home = ({ loading, error, data }: HomeProps) => {
  return (
    <PageWrapper loading={loading} error={error}>
      {data && (
        <>
          <InfoBlock
            title={data.info.title}
            description={data.info.description}
            version={data.info.version}
            license={data.info.license.name}
          />
          {data?.groupedPaths.map((entry) => {
            const [group, pathNodes] = entry

            return (
              <div key={group}>
                <h2>{group}</h2>
                <div>
                  {pathNodes.map((node) => (
                    <PathSection
                      methods={node.methods}
                      path={node.path}
                      id={node.id}
                      key={node.id}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </>
      )}
    </PageWrapper>
  )
}

export default Home
