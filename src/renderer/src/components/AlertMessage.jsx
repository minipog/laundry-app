import Alert from 'react-bootstrap/Alert'

export default function AlertMessage({ ...props }) {
  return (
    <Alert variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{props.message}</p>
    </Alert>
  )
}
