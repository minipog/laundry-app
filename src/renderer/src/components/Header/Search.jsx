import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Search() {
  return (
    <Form className="no-drag d-flex gap-2">
      <Form.Control type="search" placeholder="..." aria-label="Search" />
      <Button variant="outline-light">Search</Button>
    </Form>
  )
}
