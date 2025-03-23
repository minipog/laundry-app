import { useRevalidator } from 'react-router'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function NoteCard({ ...props }) {
  const revalidator = useRevalidator()
  async function toggleNoteStatus(id) {
    try {
      const { ok } = await window.api.toggleNoteStatus(id)
      if (ok) revalidator.revalidate()
    } catch (err) {
      console.log(err)
    }
  }

  const cardVariables = {
    background: 'transparent',
    btnVariant: 'outline-warning',
    btnText: 'Append',
    ...(props.status === 'Pending'
      ? { background: '', btnVariant: 'outline-success', btnText: 'Resolve' }
      : {})
  }

  return (
    <Card>
      <Card.Header style={{ background: cardVariables.background }}>
        Location Name
        <small className="text-muted float-end">
          Updated: {new Date(props.updatedAt).toLocaleString()} | Status: {props.status}
        </small>
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2">
          <small>
            Created by {props.author} at {new Date(props.createdAt).toLocaleString()}
          </small>
        </Card.Subtitle>
        <Card.Text>{props.body}</Card.Text>
        <Button
          variant={cardVariables.btnVariant}
          size="sm"
          className="float-end"
          onClick={() => toggleNoteStatus(props._id)}
        >
          {cardVariables.btnText}
        </Button>
      </Card.Body>
    </Card>
  )
}
