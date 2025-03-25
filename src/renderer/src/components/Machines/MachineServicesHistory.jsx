import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'

export default function MachineServicesHistory({ ...props }) {
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-between align-items-start mb-0">
          <h5 className="text-muted">Service history</h5>
          <div>
            <Button as={Badge} variant="primary" className="me-2 p-2">
              Create
            </Button>
            <Badge bg={props.serviceHistory.length ? 'success' : 'secondary'} className="p-2">
              {props.serviceHistory.length}
            </Badge>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion flush>
            {props.serviceHistory.map((service, i) => (
              <Accordion.Item key={i} eventKey={service._id}>
                <Accordion.Header>
                  <Row>
                    <Col>
                      <span className="text-muted">
                        [{service.createdAt}]<span className="fw-bold">{service.type}</span> by{' '}
                        {service.provider.name} ({service.description})
                      </span>
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body className="pt-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </>
  )
}
