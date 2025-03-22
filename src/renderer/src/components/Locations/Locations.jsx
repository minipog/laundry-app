import { useLoaderData, Link } from 'react-router'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// eslint-disable-next-line react-refresh/only-export-components
export async function locationLoader() {
  try {
    const data = await window.api.getLocation()
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}

export default function Locations() {
  const locations = useLoaderData()
  if (!locations.length) return

  return (
    <Stack gap={3} className="me-2">
      {locations.map((location, i) => (
        <Card body key={i}>
          {location.name} <small className="text-muted">({location.address})</small>
          <Link to={`/locations/${location._id}`}>
            <Button variant="light" className="float-end">
              View
            </Button>
          </Link>
        </Card>
      ))}
    </Stack>
  )
}
