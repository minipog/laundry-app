import CardGroup from 'react-bootstrap/CardGroup'
import MachineCard from './MachineCard'
import { Outlet, useLoaderData } from 'react-router'

// eslint-disable-next-line react-refresh/only-export-components
export async function machineLoader() {
  try {
    const data = await window.api.getEquipment()
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}

function Machines() {
  const machines = useLoaderData()
  if (!machines.length) return 'Nothing to show'

  return (
    <>
      <CardGroup className="me-3">
        {machines.map((machine) => (
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
        ))}
      </CardGroup>
      <Outlet />
    </>
  )
}

export default Machines
