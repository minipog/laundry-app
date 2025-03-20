import { useState } from 'react'
import { useNavigate } from 'react-router'

function useModal() {
  const [show, setShow] = useState(false)
  const [data, setData] = useState({})
  const navigate = useNavigate()

  return {
    set: (isVisible, content, to) => {
      if (content) setData(content)
      if (to) navigate(to)
      setShow(isVisible)
    },
    close: function () {
      this.set(false, data, -1)
    },
    show,
    data,
    navigate
  }
}

export default useModal
