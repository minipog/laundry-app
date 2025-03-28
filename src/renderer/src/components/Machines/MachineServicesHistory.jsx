import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'
import MachineServiceHistoryForm from './Forms/MachineServiceHistoryForm'
import { useState } from 'react'

export default function MachineServicesHistory({ ...props }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <hr />
      <Row>
        <Col className="d-flex justify-content-between align-items-start mb-0">
          <h5 className="text-muted">Service history</h5>
          <div>
            <Button
              as={Badge}
              variant="primary"
              onClick={() => setShowForm(true)}
              className="me-2 p-2"
            >
              Create
            </Button>
            <Badge bg={props.services.length ? 'success' : 'secondary'} className="p-2">
              {props.services.length}
            </Badge>
          </div>
        </Col>
      </Row>
      <MachineServiceHistoryForm
        lid={props.lid}
        mid={props.mid}
        show={showForm}
        setShowForm={setShowForm}
        setErrorMessage={props.setErrorMessage}
      />
      <Row>
        <Col>
          <Accordion flush>
            {props.services.map((service, i) => (
              <Accordion.Item key={i} eventKey={service._id}>
                <Accordion.Header>
                  <Row>
                    <Col>
                      <span className="text-muted">
                        [{new Date(service.createdAt).toLocaleString()}]{' '}
                        <span className="fw-bold">{service.type}</span> by {service.provider.name}
                        {service.description && ` (${service.description})`}
                      </span>
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body className="pt-0">{service.body}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </>
  )
}
