import Card from 'react-bootstrap/Card'

function InfoCard({ header, title, text, subtitle, footer, important, notice }) {
  return (
    <Card
      bg={important ? 'warning' : notice ? 'info' : 'light'}
      text="dark"
      style={{ width: '18rem' }}
    >
      {header && <Card.Header>{header}</Card.Header>}
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {subtitle && <Card.Subtitle className="text-muted">{subtitle}</Card.Subtitle>}
        {text && <Card.Text>{text}</Card.Text>}
      </Card.Body>
      {footer && (
        <Card.Footer>
          <small className="text-muted">{footer}</small>
        </Card.Footer>
      )}
    </Card>
  )
}

export default InfoCard
