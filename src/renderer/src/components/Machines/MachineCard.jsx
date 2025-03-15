import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

function MachineCard({ variant, imgSrc, header, title, text, info, handleModal }) {
  return (
    <Card bg={variant} className="mx-2 border-0 shadow-sm">
      {imgSrc && <Card.Img variant="top" src={imgSrc} />}
      {header && <Card.Header>{header}</Card.Header>}
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text>{text}</Card.Text>}
        {info && (
          <ListGroup variant="flush">
            {info.map((v, i) => (
              <ListGroup.Item variant={variant} className="p-1 bg-transparent" key={i}>
                {v}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {handleModal && (
          <Button
            className="mt-2 float-end"
            variant={variant === 'warning' ? 'danger' : 'info'}
            size="sm"
            onClick={() => handleModal(true)}
          >
            Manage
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default MachineCard
