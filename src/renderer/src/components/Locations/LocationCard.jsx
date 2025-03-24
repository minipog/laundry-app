import { Link } from 'react-router'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function LocationCard({ ...props }) {
  return (
    <Card body>
      {props.name}
      <p className="text-muted">
        <small>
          {props.address}
          <br />
          Opened: {new Date(props.openingDate).toDateString()}
        </small>
      </p>
      <Link to={`/locations/${props._id}`}>
        <Button variant="outline-secondary">➤</Button>
      </Link>
    </Card>
  )
}
