import styled from 'styled-components'
import { HttpRequestMethod, PathMethods } from '../../../types'
import { Heading3 } from '../../atoms/headings/Headings'
import { Link } from 'react-router-dom'
import spacings from '../../../styles/spacing'
import MethodSection from '../method-section/MethodSection'

interface PathSectionProps {
  path: string
  methods: PathMethods
  id: string
  disabledNavigation?: boolean
}

const StyledPathSection = styled.div`
  margin-block: ${spacings.XXL};
`

const StyledLink = styled(Link)<{ disabled?: boolean }>`
  pointer-events: ${({ disabled }) => `${disabled ? 'none' : 'auto'}`};
`

const PathSection = ({
  methods,
  path,
  id,
  disabledNavigation = false,
}: PathSectionProps) => (
  <StyledPathSection>
    <StyledLink to={id} disabled={disabledNavigation}>
      <Heading3>{path}</Heading3>
    </StyledLink>
    {Object.keys(methods).map((method) => (
      <MethodSection
        details={methods[method as HttpRequestMethod]}
        path={path}
        method={method as HttpRequestMethod}
      />
    ))}
  </StyledPathSection>
)

export default PathSection
