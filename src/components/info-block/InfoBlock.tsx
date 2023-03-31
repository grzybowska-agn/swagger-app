import styled from 'styled-components'
import { SwaggerInfo } from '../../types'
import ReactMarkdown from 'react-markdown'

type InfoBlockProps = Omit<
  SwaggerInfo,
  'license' | 'contact' | 'termsOfService'
> & { license: string }

const StyledInfoBlock = styled.div``

const InfoBlockTitle = styled.h1``

const InfoBlockRow = styled.div``

const InfoBlock = ({
  title,
  description,
  version,
  license,
}: InfoBlockProps) => {
  return (
    <StyledInfoBlock>
      <InfoBlockTitle>{title}</InfoBlockTitle>
      <ReactMarkdown children={description} />
      <InfoBlockRow>version: {version}</InfoBlockRow>
      <InfoBlockRow>license: {license}</InfoBlockRow>
    </StyledInfoBlock>
  )
}

export default InfoBlock
