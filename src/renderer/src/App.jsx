import { Outlet } from 'react-router'
import logoSvg from './assets/electron.svg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'

function App() {
  return (
    <Container className="app vh-100" fluid>
      <Row>
        <Col>
          <Header image={{ alt: '', src: logoSvg, width: 48, height: 48 }} />
        </Col>
      </Row>
      <Row style={{ paddingTop: 74 }}>
        <Col md={3}>
          <Menu />
        </Col>
        <Col className="pt-4">
          <Outlet />
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  )
}

export default App
