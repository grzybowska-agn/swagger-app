import { PropsWithChildren } from 'react'
import { Heading4 } from '../../headings/Headings'

const DetailsWrapper = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <>
      <Heading4>{title}</Heading4>
      {children}
    </>
  )
}

export default DetailsWrapper
