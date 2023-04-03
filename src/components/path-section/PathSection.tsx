import styled from 'styled-components'
import { PathMethod } from '../../types'
import { Code } from '@atlaskit/code'
import { Heading3 } from '../headings/Headings'
import { Link } from 'react-router-dom'

interface PathSectionProps {
  path: string
  methods: PathMethod[]
  id: string
}

const StyledPathSection = styled.div`
  margin-block: 48px;
`

const MethodItem = styled.div`
  display: flex;
`

const MethodTag = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PathTitle = styled.h3``

const PathSection = ({ methods, path, id }: PathSectionProps) => {
  return (
    <StyledPathSection>
      <Link to={id}>
        <Heading3>{path}</Heading3>
      </Link>
      {Object.keys(methods).map((method) => (
        <MethodItem key={method}>
          <MethodTag>{method}</MethodTag>
          <Code>{path}</Code>
        </MethodItem>
      ))}
    </StyledPathSection>
  )
}

export default PathSection
