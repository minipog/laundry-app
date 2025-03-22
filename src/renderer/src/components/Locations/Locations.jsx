import { useLoaderData } from 'react-router'
import Stack from 'react-bootstrap/Stack'
import LocationCard from './LocationCard'

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
        <LocationCard key={i} {...location} />
      ))}
    </Stack>
  )
}
