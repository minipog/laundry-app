import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router'
import Loading from './Loading'

function Menu() {
  const links = [
    { icon: '🖳', label: 'Dashboard', path: '/' },
    { icon: '⌸', label: 'Locations', path: '/locations' },
    { icon: '⌻', label: 'Machines', path: '/machines' },
    { icon: '🖹', label: 'Inventory', path: '/inventory' },
    { icon: '🗋', label: 'Notes', path: '/notes' }
  ]

  return (
    <Container className="menu">
      <Nav defaultActiveKey={0} className="flex-column">
        {links.map((link, i) => (
          <NavLink key={i} to={link.path}>
            {({ isPending }) => (
              <div className="d-flex p-2 gap-2">
                <span className="fs-1">{link.icon}</span>
                <span className="fw-semibold">{link.label}</span>
                {isPending && (
                  <span className="ms-auto">
                    <Loading animation="border" size="sm" />
                  </span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </Nav>
    </Container>
  )
}

export default Menu
