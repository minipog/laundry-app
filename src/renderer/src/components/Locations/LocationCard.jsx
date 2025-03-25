import { Link } from 'react-router'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function LocationCard({ ...props }) {
  return (
    <Card body className="shadow-sm bg-transparent">
      <div className="d-flex justify-content-between align-items-start">
        <span>
          {props.name}
          <p className="text-muted">
            <small>
              {props.address}
              <br />
              Opened: {new Date(props.openingDate).toDateString()}
            </small>
          </p>
        </span>
        <Link to={`/locations/${props._id}`}>
          <Button variant="outline-secondary">➤</Button>
        </Link>
      </div>
    </Card>
  )
}
