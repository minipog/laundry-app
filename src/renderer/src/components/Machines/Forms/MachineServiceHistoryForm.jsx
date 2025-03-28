import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { CheckSquare, XSquare } from 'react-bootstrap-icons'
import { useRevalidator } from 'react-router'
import { SERVICE_TYPES } from '../../../../../main/lib/enums'
import { Formik } from 'formik'

export default function MachineServiceHistoryForm({ ...props }) {
  const revalidator = useRevalidator()
  if (!props.show) return

  async function saveService(values) {
    try {
      await window.api.addEquipmentService(values, true)
      await revalidator.revalidate()
      props.setShowForm(false)
    } catch (err) {
      props.setErrorMessage(err.message)
    }
  }

  return (
    <Formik
      initialValues={{
        lid: props.lid,
        mid: props.mid,
        type: SERVICE_TYPES.REGULAR,
        provider: { name: '', contact: '' },
        description: '',
        body: ''
      }}
      onSubmit={saveService}
    >
      {({ handleSubmit, handleChange, getFieldProps, isSubmitting }) => (
        <>
          <Row className="my-3">
            <Col xs="auto">
              <FloatingLabel controlId="fl-s-service-type" label="Type">
                <Form.Select
                  aria-label="Service type select"
                  onChange={handleChange}
                  {...getFieldProps('type')}
                >
                  {Object.entries(SERVICE_TYPES).map(([_, type]) => (
                    <option key={_} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="i-service-description" label="Description">
                <Form.Control
                  aria-label="Description"
                  aria-describedby="i-service-description"
                  onChange={handleChange}
                  {...getFieldProps('description')}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                {...getFieldProps('body')}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs="auto">
              <FloatingLabel controlId="i-service-provider-name" label="Provider Name">
                <Form.Control
                  aria-label="Provider Name"
                  aria-describedby="i-service-provider-name"
                  onChange={handleChange}
                  {...getFieldProps('provider.name')}
                />
              </FloatingLabel>
            </Col>
            <Col xs="auto">
              <FloatingLabel controlId="i-service-provider-contact" label="Contact Details">
                <Form.Control
                  aria-label="Contact Details"
                  aria-describedby="i-service-provider-contact"
                  onChange={handleChange}
                  {...getFieldProps('provider.contact')}
                />
              </FloatingLabel>
            </Col>
            <Col xs="auto" className="ms-auto d-flex gap-2">
              <CheckSquare size={32} color="royalblue" onClick={handleSubmit} />
              <XSquare size={32} color="royalblue" onClick={() => props.setShowForm(false)} />
            </Col>
          </Row>
        </>
      )}
    </Formik>
  )
}
