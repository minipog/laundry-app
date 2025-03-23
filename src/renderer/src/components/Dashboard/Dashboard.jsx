import Notice from './Notice'
import InfoCard from './InfoCard'
import CardGroup from 'react-bootstrap/CardGroup'

function Dashboard({ totalLocations, totalMachines, nonOperationalMachineCount }) {
  return (
    <>
      <Notice />
      <CardGroup className="mb-3">
        <InfoCard title={`${totalLocations} locations`} />
        <InfoCard
          title={`${totalMachines} machines`}
          subtitle={`${nonOperationalMachineCount} out of service`}
          important
        />
        <InfoCard header="23% average usage" />
      </CardGroup>
      <CardGroup>
        <InfoCard title="Expected Revenue: xxxx" text="..." />
        <InfoCard title="Expected Expenes: xxxx" text="..." />
      </CardGroup>
    </>
  )
}

export default Dashboard
