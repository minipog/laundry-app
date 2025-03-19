import CardGroup from 'react-bootstrap/CardGroup'
import MachineCard from './MachineCard'
import { useState, useEffect } from 'react'

function Machines() {
  const [machines, setMachines] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const data = await window.api.getEquipment()
        setMachines(JSON.parse(data))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [machines.length])

  if (!machines.length) return 'Nothing to show'

  return (
    <CardGroup className="me-3">
      {machines.map((machine) => {
        return (
          <MachineCard
            key={machine._id}
            id={machine._id}
            variant={machine.isOperational ? '' : 'warning'}
            header={machine.locationName}
            title={`${machine.type} #${machine.plateNumber}`}
            info={[
              `PPC: ${machine.pricePerCycle}`,
              `Capacity: ${machine.capacity}kg`,
              `Service times: ${machine.serviceHistory.length}`,
              `Operational: ${machine.isOperational ? 'Yes' : 'No'}`
            ]}
          />
        )
      })}
    </CardGroup>
  )
}

export default Machines
