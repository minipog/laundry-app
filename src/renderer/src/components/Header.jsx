import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

function Header({ image, text = 'Business Name' }) {
  return (
    <Navbar fixed="top" className="header">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            alt={image.alt}
            src={image.src}
            className="logo"
            style={{ width: image.width, height: image.height }}
          />
          <span className="businessName">{text}</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
