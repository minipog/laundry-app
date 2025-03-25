import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Search from './Search'
import Buttons from './Buttons'

function Header({ image, text = 'hedgehog' }) {
  return (
    <Navbar className="header p-2 pt-4">
      <Container fluid>
        <Navbar.Brand>
          <img
            alt={image.alt}
            src={image.src}
            className="logo"
            style={{ width: image.width, height: image.height }}
          />
          <span className="businessName">{text}</span>
        </Navbar.Brand>
        <div className="d-flex justify-content-end gap-3">
          <Search />
          <Buttons />
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
