import styled from 'styled-components'
import spacings from '../../styles/spacing'
import { Parameter, PathResponse, StatusCode } from '../../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import DetailsWrapper from './details-wrapper/DetailsWrapper'
import colors from '../../styles/colors'

const StyledDetailsSection = styled.div`
  margin-block: ${spacings.XL};
  margin-inline: ${spacings.XXL};
  padding: ${spacings.S} ${spacings.XL} ${spacings.XL};
  background-color: ${colors.mainBackground};
  border-radius: ${spacings.XS};
`

const DetailsTextBlock = styled.div`
  font-size: 0.9rem;
  margin-bottom: ${spacings.XS};
`

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  font-size: 0.8rem;
  line-height: 1.5;
`

interface DetailsSectionProps {
  parameters: Parameter[]
  responses: Record<StatusCode | 'default', PathResponse>
}

const DetailsSection = ({ parameters, responses }: DetailsSectionProps) => {
  return (
    <StyledDetailsSection>
      {!!parameters.length && (
        <DetailsWrapper title="parameters">
          {parameters.map((parameter) => (
            <StyledSyntaxHighlighter language="json">
              {JSON.stringify(parameter, null, 2)}
            </StyledSyntaxHighlighter>
          ))}
        </DetailsWrapper>
      )}

      {!!Object.keys(responses).length && (
        <DetailsWrapper title="responses">
          {Object.entries(responses).map(([statusCode, item]) => (
            <DetailsTextBlock>
              <strong>{statusCode}</strong>: {item.description}
              {item.schema && (
                <StyledSyntaxHighlighter language="json">
                  {JSON.stringify(item.schema, null, 2)}
                </StyledSyntaxHighlighter>
              )}
            </DetailsTextBlock>
          ))}
        </DetailsWrapper>
      )}
    </StyledDetailsSection>
  )
}

export default DetailsSection
