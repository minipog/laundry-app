import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'

function MachineCard({ ...props }) {
  return (
    <Card bg={props?.variant} className="border-0 shadow-sm">
      {props?.imgSrc && <Card.Img variant="top" src={props.imgSrc} />}
      {props?.header && <Card.Header>{props.header}</Card.Header>}
      <Card.Body>
        {props?.title && <Card.Title>{props.title}</Card.Title>}
        {props?.text && <Card.Text>{props.text}</Card.Text>}
        {props?.info && (
          <ListGroup variant="flush">
            {props.info.map((item, i) => (
              <ListGroup.Item key={i} variant={props?.variant} className="p-1 bg-transparent">
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Link to={`/machines/manage/${props?.id}`}>
          <Button
            className="mt-2 float-end"
            variant={props?.variant === 'warning' ? 'danger' : 'info'}
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
