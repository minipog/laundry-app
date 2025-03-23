import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function Notice() {
  return (
    <Card className="mb-3">
      <Card.Header as="h5">Notice</Card.Header>
      <Card.Body>
        <Card.Title>Supplies are running low</Card.Title>
        <Card.Text>Make an order as soon as possible</Card.Text>
        <Button variant="secondary">Take me there</Button>
      </Card.Body>
    </Card>
  )
}

export default Notice
