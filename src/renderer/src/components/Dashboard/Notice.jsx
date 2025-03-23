import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function Notice() {
  return (
    <Card border="secondary" className="mb-3 shadow-sm">
      <Card.Header>Notice</Card.Header>
      <Card.Body>
        <Card.Title>Supplies are running low</Card.Title>
        <Card.Text>
          Curabitur a dolor et turpis interdum scelerisque eu vel tortor. Quisque id posuere ipsum.
          Sed ut quam et diam porttitor tempus sed aliquet metus. Integer eget nibh eget tellus
          fermentum condimentum. Aenean vulputate commodo varius. Quisque scelerisque porta turpis,
          vel scelerisque purus.
        </Card.Text>
        <Button variant="light" className="float-end">
          👌
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Notice
