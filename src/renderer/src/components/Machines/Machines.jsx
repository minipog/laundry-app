import CardGroup from 'react-bootstrap/CardGroup'
import MachineCard from './MachineCard'
import MachineManageModal from './MachineManageModal'
import { useState, useEffect } from 'react'

function Machines() {
  const [show, setShow] = useState(false)
  const [machineData, setMachineData] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const data = await window.api.getEquipment()
        setMachineData(JSON.parse(data))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  const handleMachineManageModal = (visibility, machine) => {
    // setMachineData(machine)
    setShow(visibility)
  }

  if (!machineData.length) return 'Nothing to show'

  return (
    <>
      <MachineManageModal show={show} setShow={setShow} />
      <CardGroup className="me-3">
        {machineData.map((machine) => {
          return (
            <MachineCard
              key={machine.__id}
              variant={machine.isOperational ? '' : 'warning'}
              header={machine.locationName || ''}
              title={`${machine.type} #${machine.plateNumber}`}
              info={[
                `PPW: ${machine.pricePerCycle}`,
                `Capacity: ${machine.capacity}kg`,
                `Service times: ${machine.serviceHistory.length}`,
                `Operational: ${machine.isOperational ? 'Yes' : 'No'}`
              ]}
              handleModal={() => handleMachineManageModal(true)}
            />
          )
        })}
      </CardGroup>
    </>
  )
}

export default Machines
