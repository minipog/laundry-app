import Spinner from 'react-bootstrap/Spinner'

export default function Loading({ defaultSpinner, ...props }) {
  return defaultSpinner ? <Spinner animation="grow" variant="info" /> : <Spinner {...props} />
}
