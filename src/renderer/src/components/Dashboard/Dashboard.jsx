import Notice from './Notice'
import InfoCard from './InfoCard'
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container'

function Dashboard({ totalLocations, totalMachines, nonOperationalMachineCount }) {
  return (
    <Container className="ps-0 pe-2">
      <Notice />
      <CardGroup className="pt-2">
        <InfoCard title={`${totalLocations} locations`} />
        <InfoCard
          title={`${totalMachines} machines`}
          subtitle={`${nonOperationalMachineCount} out of service`}
          important
        />
        <InfoCard header="23% average usage" />
      </CardGroup>
      <CardGroup className="pt-2">
        <InfoCard title="Expected Revenue: xxxx" text="..." />
        <InfoCard title="Expected Expenes: xxxx" text="..." />
      </CardGroup>
    </Container>
  )
}

export default Dashboard
