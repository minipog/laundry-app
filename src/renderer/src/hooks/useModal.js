import { useState } from 'react'

function useModal() {
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null)

  return {
    handleModal: (visibility, content) => {
      setData(content || data)
      setShow(visibility)
    },
    show,
    data
  }
}

export default useModal
