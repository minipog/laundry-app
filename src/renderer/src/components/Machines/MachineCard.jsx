import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'

function MachineCard({ id, variant, imgSrc, header, title, text, info }) {
  return (
    <Card bg={variant} className="me-3 border-0 shadow-sm" style={{ maxWidth: '18rem' }}>
      {imgSrc && <Card.Img variant="top" src={imgSrc} />}
      {header && <Card.Header>{header}</Card.Header>}
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text>{text}</Card.Text>}
        {info && (
          <ListGroup variant="flush">
            {info.map((item, i) => (
              <ListGroup.Item key={i} variant={variant} className="p-1 bg-transparent">
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Link to={`/machines/manage/${id}`}>
          <Button
            className="mt-2 float-end"
            variant={variant === 'warning' ? 'danger' : 'info'}
            size="sm"
          >
            Manage
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default MachineCard
