import { Link } from 'react-router'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function NoteCard({ ...props }) {
  return (
    <Card>
      <Card.Header>
        Location Name
        <small className="text-muted float-end">Status: {props.status}</small>
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2">
          <small>
            Created by {props.author} at {new Date(props.createdAt).toLocaleString()}
          </small>
        </Card.Subtitle>
        <Card.Text>{props.body}</Card.Text>
        <Link to="/notes">
          <Button variant="outline-success" size="sm" className="float-end">
            Resolve
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
