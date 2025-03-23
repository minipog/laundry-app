import Notice from './Notice'
import InfoCard from './InfoCard'
import CardGroup from 'react-bootstrap/CardGroup'
import { useLoaderData } from 'react-router'

// eslint-disable-next-line react-refresh/only-export-components
export async function dashboardLoader() {
  try {
    return await window.api.getDashboardData()
  } catch (err) {
    console.log(err)
  }
}

function Dashboard() {
  const { totalLocations, totalMachines, totalNonOperationalMachines } = useLoaderData()

  return (
    <>
      <Notice />
      <CardGroup className="mb-3">
        <InfoCard title={`${totalLocations} locations`} />
        <InfoCard
          title={`${totalMachines} machines`}
          subtitle={`${totalNonOperationalMachines} out of service`}
          important
        />
        <InfoCard subtitle="23% average usage" />
      </CardGroup>
      <CardGroup>
        <InfoCard header="Revenues" title="Expected Revenue: xxxx" text="..." />
        <InfoCard header="Expenses" title="Expected Expenes: xxxx" text="..." />
      </CardGroup>
    </>
  )
}

export default Dashboard
