import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import ErrorMessage from '../../atoms/error-message/ErrorMessage'
import Loader from '../../atoms/loader/Loader'

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  margin-block: 100px;
`

interface PageWrapperProps {
  loading: boolean
  error: boolean
}

const PageWrapper = ({
  children,
  loading,
  error,
}: PropsWithChildren<PageWrapperProps>) => (
  <StyledPageWrapper>
    {loading && <Loader />}
    {error && <ErrorMessage />}
    {children}
  </StyledPageWrapper>
)

export default PageWrapper
