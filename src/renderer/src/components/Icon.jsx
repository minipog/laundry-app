import * as icons from 'react-bootstrap-icons'

export default function Icon({ iconName, ...props }) {
  const BootstrapIcon = icons[iconName]
  return <BootstrapIcon {...props} />
}
