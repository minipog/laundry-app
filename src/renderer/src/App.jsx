import { Outlet } from 'react-router'
import hedgehogSvg from './assets/hedgehog.svg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from './components/Header/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'

function App() {
  return (
    <Container className="app vh-100" fluid>
      <Row>
        <Col>
          <Header image={{ src: hedgehogSvg, alt: '🦔', width: 48, height: 48 }} />
        </Col>
      </Row>
      <Row style={{ paddingTop: 74 }}>
        <Col md={3}>
          <Menu />
        </Col>
        <Col className="content my-4 me-2">
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
