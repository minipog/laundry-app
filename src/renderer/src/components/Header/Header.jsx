import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Search from './Search'

function Header({ image, text = 'hedgehog' }) {
  return (
    <Navbar fixed="top" className="header">
      <Container fluid className="me-2">
        <Navbar.Brand>
          <img
            alt={image.alt}
            src={image.src}
            className="logo"
            style={{ width: image.width, height: image.height }}
          />
          <span className="businessName">{text}</span>
        </Navbar.Brand>
        <Search />
      </Container>
    </Navbar>
  )
}

export default Header
