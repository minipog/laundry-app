import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { EQUIPMENT_TYPES, OWNERSHIP_TYPES } from '../../../../main/lib/enums'
import { useLoaderData } from 'react-router'
import { Formik } from 'formik'
import { useState } from 'react'
import useModal from '../../hooks/useModal'
import AlertMessage from '../AlertMessage'
import MachineServicesHistory from './MachineServicesHistory'

// eslint-disable-next-line react-refresh/only-export-components
export async function machineManageModalLoader({ params }) {
  try {
    const equipment = await window.api.getEquipment({ _id: params.id })
    const locations = await window.api.getLocations()
    return { equipment, locations }
  } catch (err) {
    console.log(err)
  }
}

function MachineManageModal() {
  const [errorMessage, setErrorMessage] = useState(null)
  const { equipment, locations } = useLoaderData()
  const modal = useModal(true, ...JSON.parse(equipment))

  async function saveMachine(values) {
    try {
      const { ok } = await window.api.addEquipment(values, false)
      if (ok) modal.close(true)
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <Modal
      size="lg"
      show={modal.show}
      backdrop="static"
      keyboard={false}
      onHide={() => modal.close()}
    >
      <Formik initialValues={modal.data} onSubmit={saveMachine}>
        {({ handleSubmit, handleChange, getFieldProps, isSubmitting, values }) => (
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                <Row>
                  <Col xs="auto">Machine Management (#{values.plateNumber})</Col>
                  <Col>
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
              {errorMessage && (
                <Row>
                  <Col>
                    <AlertMessage message={errorMessage} />
                  </Col>
                </Row>
              )}
              <Row className="mb-3">
                <Col xs="auto">
                  <FloatingLabel controlId="fl-s-machine-type" label="Type">
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
                <Col xs="auto">
                  <FloatingLabel controlId="fl-s-machine-location" label="Location">
                    <Form.Select
                      aria-label="Machine location select"
                      onChange={handleChange}
                      {...getFieldProps('lid')}
                    >
                      {JSON.parse(locations).map((location, i) => (
                        <option key={i} value={location._id}>
                          {location.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="ig-serial-number" label="Serial Number">
                    <Form.Control
                      aria-label="S/N"
                      aria-describedby="ig-serial-number"
                      placeholder="xxx-xxx-xxx"
                      onChange={handleChange}
                      {...getFieldProps('serialNumber')}
                    />
                  </FloatingLabel>
                </Col>
                <Col xs="2">
                  <FloatingLabel controlId="ig-plate-number" label="Plate Number">
                    <Form.Control
                      aria-label="P/N"
                      aria-describedby="ig-plate-number"
                      onChange={handleChange}
                      {...getFieldProps('plateNumber')}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs="8">
                  <FloatingLabel controlId="ig-model-name" label="Model">
                    <Form.Control
                      aria-label="Model"
                      aria-describedby="ig-model-name"
                      placeholder="Example Model Name 1"
                      onChange={handleChange}
                      {...getFieldProps('name')}
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="ig-model-capacity" label="Capacity">
                    <Form.Control
                      aria-label="Capacity"
                      aria-describedby="ig-model-capacity"
                      onChange={handleChange}
                      {...getFieldProps('capacity')}
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="ig-model-price-per-cycle" label="PPC">
                    <Form.Control
                      aria-label="Price per cycle"
                      aria-describedby="ig-model-price-per-cycle"
                      onChange={handleChange}
                      {...getFieldProps('pricePerCycle')}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs="4">
                  <FloatingLabel controlId="ig-model-ownership-type" label="Ownership">
                    <Form.Select
                      aria-label="Machine ownership type select"
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
                  </FloatingLabel>
                </Col>
                <Col xs="auto">
                  <FloatingLabel controlId="ig-model-ownership-cost" label="Cost">
                    <Form.Control
                      aria-label="Cost"
                      aria-describedby="ig-model-ownership-cost"
                      onChange={handleChange}
                      {...getFieldProps('ownership.cost')}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              {values.ownership.type === OWNERSHIP_TYPES.LEASE && (
                <Row className="mb-3">
                  <Col>
                    <FloatingLabel controlId="ig-model-lease-provider" label="Lease Provider">
                      <Form.Control
                        aria-label="Lease Provider"
                        aria-describedby="ig-model-lease-provider"
                        onChange={handleChange}
                        {...getFieldProps('ownership.lease.provider')}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel controlId="ig-model-lease-start-date" label="Lease Start">
                      <Form.Control
                        aria-label="Lease Start"
                        aria-describedby="ig-model-lease-start-date"
                        onChange={handleChange}
                        placeholder="MM/DD/YY"
                        {...getFieldProps('ownership.lease.startDate')}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel controlId="ig-model-lease-end-date" label="Lease End">
                      <Form.Control
                        aria-label="Lease End"
                        aria-describedby="ig-model-lease-end-date"
                        onChange={handleChange}
                        placeholder="MM/DD/YY"
                        {...getFieldProps('ownership.lease.endDate')}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              )}
              <MachineServicesHistory serviceHistory={values.serviceHistory} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => modal.close()}>
                Close
              </Button>
              <Button variant="info" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default MachineManageModal
