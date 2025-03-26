import Stack from 'react-bootstrap/Stack'

export default function Buttons() {
  return (
    <Stack className="no-drag frame-btns" direction="horizontal" gap={2}>
      <span onClick={() => window.api.appMinimize()}>🗕</span>
      <span onClick={() => window.api.appMaximize()}>🗖</span>
      <span onClick={() => window.api.appClose()}>🗙</span>
    </Stack>
  )
}
