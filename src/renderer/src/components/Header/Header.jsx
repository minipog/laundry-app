import Stack from 'react-bootstrap/Stack'
import Search from './Search'
import Buttons from './Buttons'

function Header({ image, text = 'hedgehog' }) {
  return (
    <Stack className="header p-3" direction="horizontal" gap={2}>
      <img alt={image.alt} src={image.src} className="logo" />
      <span className="businessName">{text}</span>
      <Search />
      <Buttons />
    </Stack>
  )
}

export default Header
