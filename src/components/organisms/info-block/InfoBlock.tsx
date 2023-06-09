import styled from 'styled-components'
import { SwaggerInfo } from '../../../types'
import ReactMarkdown from 'react-markdown'
import { Heading1 } from '../../atoms/headings/Headings'

type InfoBlockProps = Omit<
  SwaggerInfo,
  'license' | 'contact' | 'termsOfService'
> & { license: string }

const StyledInfoBlock = styled.div``

const InfoBlockRow = styled.div``

const InfoBlock = ({
  title,
  description,
  version,
  license,
}: InfoBlockProps) => {
  return (
    <StyledInfoBlock>
      <Heading1>{title}</Heading1>
      <ReactMarkdown children={description} />
      <InfoBlockRow>version: {version}</InfoBlockRow>
      <InfoBlockRow>license: {license}</InfoBlockRow>
    </StyledInfoBlock>
  )
}

export default InfoBlock
