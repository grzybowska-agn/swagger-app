import { Heading2 } from '../../components/headings/Headings'
import InfoBlock from '../../components/info-block/InfoBlock'
import PathSection from '../../components/path-section/PathSection'
import { SwaggerData } from '../../types'

interface HomeProps {
  data: SwaggerData | null
}

const HomePage = ({ data }: HomeProps) => (
  <>
    {data && (
      <>
        <InfoBlock
          title={data.info.title}
          description={data.info.description}
          version={data.info.version}
          license={data.info.license.name}
        />
        {data?.groupedPaths.map(([group, pathNodes]) => (
          <div key={group}>
            <Heading2>{group}</Heading2>
            {pathNodes.map((node) => (
              <PathSection
                methods={node.methods}
                path={node.path}
                id={node.id}
                key={node.id}
              />
            ))}
          </div>
        ))}
      </>
    )}
  </>
)

export default HomePage
