import { useLoaderData } from 'react-router'
import Stack from 'react-bootstrap/Stack'
import NoteCard from './NoteCard'

// eslint-disable-next-line react-refresh/only-export-components
export async function notesLoader() {
  try {
    const data = await window.api.getNotes()
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}

export default function Notes() {
  const notes = useLoaderData()
  if (!notes.length) return

  return (
    <Stack gap={3}>
      {notes.map((note, i) => (
        <NoteCard key={i} {...note} />
      ))}
    </Stack>
  )
}
