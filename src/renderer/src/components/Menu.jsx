import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import iconDashboard from '../assets/icons/activity.svg'
import iconLocations from '../assets/icons/pin-map.svg'
import iconMachines from '../assets/icons/collection.svg'
import iconInventory from '../assets/icons/checkmark.svg'
import iconNotes from '../assets/icons/notes.svg'
import { NavLink } from 'react-router'
import Loading from './Loading'

function Menu() {
  const links = [
    { icon: iconDashboard, label: 'Dashboard', path: '/' },
    { icon: iconLocations, label: 'Locations', path: '/locations' },
    { icon: iconMachines, label: 'Machines', path: '/machines' },
    { icon: iconInventory, label: 'Inventory', path: '/inventory' },
    { icon: iconNotes, label: 'Notes', path: '/notes' }
  ]

  return (
    <Container className="menu">
      <Nav defaultActiveKey={0} className="flex-column">
        {links.map((link, i) => (
          <NavLink key={i} to={link.path}>
            {({ isPending }) => (
              <div className="p-2">
                <img src={link.icon} alt={link.label} />
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
