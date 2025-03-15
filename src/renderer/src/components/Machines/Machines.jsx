import CardGroup from 'react-bootstrap/CardGroup'
import MachineCard from './MachineCard'
import MachineManageModal from './MachineManageModal'
import { useState } from 'react'

function Machines({ machines = [] }) {
  const [show, setShow] = useState(false)
  const [machineData, setMachineData] = useState(null)

  const handleMachineManageModal = (visibility, machine) => {
    setMachineData(machine)
    setShow(visibility)
  }

  if (!machines.length) return 'Nothing to show'

  return (
    <>
      <MachineManageModal show={show} setShow={setShow} machine={machineData} />
      <CardGroup className="me-3">
        {machines.map((machine) => {
          const { model, pricePerWash, isOperational } = machine.data
          const locationName = ''

          return (
            <MachineCard
              key={machine.id}
              variant={isOperational ? '' : 'warning'}
              header={locationName}
              title={`${machine.type} #${machine.plateNumber}`}
              info={[
                `PPW: ${pricePerWash}`,
                `Capacity: ${model.capacity}kg`,
                `Service times: ${model.serviceHistory.length}`,
                `Operational: ${isOperational ? 'Yes' : 'No'}`
              ]}
              handleModal={() => handleMachineManageModal(true, { ...machine, locationName })}
            />
          )
        })}
      </CardGroup>
    </>
  )
}

export default Machines
