import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

function Footer() {
  return (
    <Navbar className="footer" fixed="bottom">
      <Container fluid>
        <Navbar.Collapse className="justify-content-end me-2">
          <Navbar.Text>
            Signed in as: <a href="#login">Lior S</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Footer
