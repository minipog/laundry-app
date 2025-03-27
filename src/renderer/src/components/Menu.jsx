import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router'
import Icon from './Icon'
import Loading from './Loading'

function Menu() {
  const links = [
    { icon: 'Activity', label: 'Dashboard', path: '/' },
    { icon: 'PinMap', label: 'Locations', path: '/locations' },
    { icon: 'Collection', label: 'Machines', path: '/machines' },
    { icon: 'ClipboardCheck', label: 'Inventory', path: '/inventory' },
    { icon: 'CardList', label: 'Notes', path: '/notes' }
  ]

  return (
    <Container className="menu">
      <Nav defaultActiveKey={0} className="flex-column">
        {links.map((link, i) => (
          <NavLink key={i} to={link.path}>
            {({ isPending }) => (
              <div className="p-2">
                <Icon iconName={link.icon} size={32} />
                <span className="ms-3 fw-semibold">{link.label}</span>
                {isPending && (
                  <span className="float-end">
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
