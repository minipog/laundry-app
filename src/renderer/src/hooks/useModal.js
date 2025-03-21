import { useState } from 'react'
import { useNavigate, useRevalidator } from 'react-router'

function useModal(isVisible = false, content = {}) {
  const [show, setShow] = useState(isVisible)
  const [data, setData] = useState(content)
  const navigate = useNavigate()
  const revalidator = useRevalidator()

  return {
    set: (isVisible, content) => {
      if (content) setData(content)
      setShow(isVisible)
    },
    close: async function (revalidate) {
      if (revalidate) await revalidator.revalidate()
      navigate(-1)
      this.set(false)
    },
    show,
    data,
    navigate
  }
}

export default useModal
