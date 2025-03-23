import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import _Tooltip from 'react-bootstrap/Tooltip'

export default function Tooltip({ ...props }) {
  return (
    <OverlayTrigger
      placement={props.placement}
      overlay={<_Tooltip id={props.id}>{props.text}</_Tooltip>}
    >
      {props.element}
    </OverlayTrigger>
  )
}
