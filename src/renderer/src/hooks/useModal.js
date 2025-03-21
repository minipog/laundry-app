import { useState } from 'react'
import { useNavigate, useRevalidator } from 'react-router'

function useModal() {
  const [show, setShow] = useState(false)
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const revalidator = useRevalidator()

  return {
    set: (isVisible, content) => {
      if (content) setData(content)
      setShow(isVisible)
    },
    close: async function (revalidate) {
      if (revalidate) await revalidator.revalidate()
      this.set(false, data)
      navigate(-1)
    },
    show,
    data,
    navigate
  }
}

export default useModal
