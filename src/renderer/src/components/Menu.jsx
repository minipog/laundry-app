import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router'
import Loading from './Loading'

function Menu() {
  const links = [{ label: 'Dashboard', path: '/' }, 'Locations', 'Machines', 'Inventory', 'Notes']

  return (
    <Container className="menu">
      <Nav defaultActiveKey={0} className="flex-column">
        {links.map((link, i) => (
          <NavLink key={i} to={link.path || `/${link.toLowerCase()}`}>
            {({ isPending }) => (
              <>
                {link.label || link}
                {isPending && (
                  <span className="float-end">
                    <Loading animation="border" size="sm" />
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </Nav>
    </Container>
  )
}

export default Menu
