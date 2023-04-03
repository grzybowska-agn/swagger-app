const ErrorMessage = ({
  message = 'Something went wrong...',
}: {
  message?: string
}) => {
  return <div>{message}</div>
}

export default ErrorMessage
