import Stack from 'react-bootstrap/Stack'
import CloseButton from 'react-bootstrap/CloseButton'

export default function Buttons() {
  return (
    <Stack className="no-drag" direction="horizontal" gap={2}>
      <CloseButton variant="white" />
      <CloseButton variant="white" />
      <CloseButton variant="white" />
    </Stack>
  )
}
