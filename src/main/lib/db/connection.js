import mongoose from 'mongoose'

export default async function dbConnect() {
  try {
    const conn = await mongoose
      .createConnection(import.meta.env.MAIN_VITE_ATLAS_URI, {
        serverApi: { version: '1', strict: true, deprecationErrors: true }
      })
      .asPromise()

    await conn.db.admin().command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')

    return conn
  } catch (err) {
    throw new Error(err)
  } finally {
    // Runs .close() on all connections in parallel.
    await mongoose.disconnect()
  }
}
