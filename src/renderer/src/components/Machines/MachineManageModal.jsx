import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'
import { EQUIPMENT_TYPES, OWNERSHIP_TYPES } from '../../../../main/lib/enums'
import saveMachineSchema from './actions/saveMachine.schema'
import useModal from '../../hooks/useModal'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Formik } from 'formik'

function MachineManageModal() {
  const { handleModal, show, data } = useModal()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const content = await window.api.getEquipment({ _id: id })
        handleModal(true, ...JSON.parse(content))
      } catch (err) {
        console.log(err)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate])

  return (
    <Modal
      size="lg"
      show={show}
      backdrop="static"
      keyboard={false}
      onHide={() => handleModal(false)}
    >
      <Formik validationSchema={saveMachineSchema} initialValues={data} onSubmit={console.log}>
        {({ handleSubmit, handleChange, getFieldProps, values, touched, isValid, errors }) => {
          console.log({ values, errors })

          return (
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <Row>
                    <Col>
                      Machine Management (#{values.plateNumber} @ {values.locationName})
                    </Col>
                    <Col xs="auto">
                      <Form.Switch
                        defaultChecked={values.isOperational}
                        isValid={values.isOperational}
                        name="isOperational"
                        label={values.isOperational ? 'Operating' : 'Non-operating'}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="mb-3">
                  <Col xs="auto">
                    <FloatingLabel controlId="fl-s-machine-type" label="Machine type">
                      <Form.Select
                        aria-label="Machine type select"
                        onChange={handleChange}
                        {...getFieldProps('type')}
                      >
                        {Object.entries(EQUIPMENT_TYPES).map(([_, type]) => (
                          <option key={_} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="ig-serial-number">S/N:</InputGroup.Text>
                      <Form.Control
                        aria-label="S/N"
                        aria-describedby="ig-serial-number"
                        placeholder="xxx-xxx-xxx"
                        onChange={handleChange}
                        {...getFieldProps('serialNumber')}
                      />
                      <InputGroup.Text id="ig-model-name">Model:</InputGroup.Text>
                      <Form.Control
                        aria-label="Model"
                        aria-describedby="ig-model-name"
                        placeholder="Example Model Name 1"
                        onChange={handleChange}
                        {...getFieldProps('name')}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs="auto">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="ig-model-capacity">Capacity:</InputGroup.Text>
                      <Form.Control
                        aria-label="Capacity"
                        aria-describedby="ig-model-capacity"
                        onChange={handleChange}
                        isValid={touched.capacity && !errors.capacity}
                        {...getFieldProps('capacity')}
                      />
                      <InputGroup.Text id="ig-model-price-per-wash">PPW:</InputGroup.Text>
                      <Form.Control
                        aria-label="Price per wash"
                        aria-describedby="ig-model-price-per-wash"
                        onChange={handleChange}
                        isValid={touched.pricePerCycle && !errors.pricePerCycle}
                        {...getFieldProps('pricePerCycle')}
                      />
                      <InputGroup.Text id="ig-model-ownership-type">Ownership:</InputGroup.Text>
                      <Form.Select
                        aria-label="Machine type select"
                        aria-describedby="ig-model-ownership-type"
                        onChange={handleChange}
                        {...getFieldProps('ownership.type')}
                      >
                        {Object.entries(OWNERSHIP_TYPES).map(([_, type]) => (
                          <option key={_} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                      <InputGroup.Text id="ig-model-ownership-cost">Cost:</InputGroup.Text>
                      <Form.Control
                        aria-label="Cost"
                        aria-describedby="ig-model-ownership-cost"
                        onChange={handleChange}
                        {...getFieldProps('ownership.cost')}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                {values.ownership.type === OWNERSHIP_TYPES.LEASE && (
                  <Row className="mb-3">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="ig-model-lease-provider">
                        Lease Provider:
                      </InputGroup.Text>
                      <Form.Control
                        aria-label="Lease Provider"
                        aria-describedby="ig-model-lease-provider"
                        onChange={handleChange}
                        {...getFieldProps('ownership.lease.provider')}
                      />
                      <InputGroup.Text id="ig-model-lease-date">Lease Date:</InputGroup.Text>
                      <Form.Control
                        aria-label="Lease Date"
                        aria-describedby="ig-model-lease-date"
                        onChange={handleChange}
                        placeholder="MM/DD/YY"
                        {...getFieldProps('ownership.lease.startDate')}
                      />
                    </InputGroup>
                  </Row>
                )}
                <Row>
                  <Col className="d-flex justify-content-between align-items-start mb-0">
                    <h5 className="text-muted">Service history</h5>
                    <Badge bg={data.serviceHistory.length ? 'success' : 'secondary'} pill>
                      {data.serviceHistory.length}
                    </Badge>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Accordion flush>
                      {data.serviceHistory.map((service, i) => (
                        <Accordion.Item key={i} eventKey={service._id}>
                          <Accordion.Header>
                            <Row>
                              <Col>
                                <span className="text-muted">
                                  [{service.date}] <span className="fw-bold">{service.type}</span>{' '}
                                  by {service.provider.name} ({service.description})
                                </span>
                              </Col>
                            </Row>
                          </Accordion.Header>
                          <Accordion.Body className="pt-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => handleModal(false)}>
                  Close
                </Button>
                <Button variant="info" type="submit" disabled={!isValid}>
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default MachineManageModal
