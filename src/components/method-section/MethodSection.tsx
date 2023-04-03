import styled from 'styled-components'
import { HttpRequestMethod, Path } from '../../types'
import spacings from '../../styles/spacing'
import DetailsSection from '../details-section/DetailsSection'
import colors from '../../styles/colors'
import SyntaxHighlighter from 'react-syntax-highlighter'

const StyledMethodSection = styled.div`
  background-color: ${colors.secondaryBackground};
  padding-block: ${spacings.L};
  border-radius: ${spacings.XS};
  margin-bottom: ${spacings.L};
`

const MethodHeader = styled.div`
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

interface MethodSectionProps {
  method: HttpRequestMethod
  path: string
  details: Path
}

const MethodSection = ({ method, path, details }: MethodSectionProps) => {
  return (
    <StyledMethodSection>
      <MethodHeader>
        <MethodTag>{method}</MethodTag>
        <SyntaxHighlighter>{path}</SyntaxHighlighter>
      </MethodHeader>

      <DetailsSection
        parameters={details.parameters}
        responses={details.responses}
      />
    </StyledMethodSection>
  )
}

export default MethodSection
