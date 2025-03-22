import dbConnect from './db/connection'
import {
  expenseSchema,
  equipmentServiceSchema,
  equipmentSchema,
  locationSchema,
  noteSchema
} from './db/schema'
import { Types } from 'mongoose'
import { EventEmitter } from 'events'

class BusinessManager extends EventEmitter {
  constructor() {
    super()
    this.setMaxListeners(0)
    this.initialize()
  }

  async initialize() {
    try {
      this.db = await dbConnect()
      this.expenses = this.db.model('Expenses', expenseSchema)
      this.equipmentServices = this.db.model('EquipmentServices', equipmentServiceSchema)
      this.equipment = this.db.model('Equipment', equipmentSchema)
      this.locations = this.db.model('Locations', locationSchema)
      this.notes = this.db.model('Notes', noteSchema)
      this.emit('ready')
    } catch (err) {
      this.emit('error', err.message)
    }
  }

  async getLocations(query = {}) {
    const location = await this.locations.find(query, { __v: 0 })
    return JSON.stringify(location)
  }

  async addEquipment(props = {}, isNew) {
    if (isNew) return await this.equipment.create(props)

    const equipment = await this.equipment.findOne({ _id: props._id })
    Object.entries(props).forEach(([key, value]) => equipment.$set(key, value))
    await equipment.save()
    return { ok: true }
  }

  async getEquipment(query = {}) {
    const equipment = await this.equipment.find(query, { __v: 0 })
    return JSON.stringify(equipment)
  }

  async getNotes(query = {}) {
    const note = await this.notes.find(query, { __v: 0 })
    return JSON.stringify(note)
  }

  _makeObjectId(string) {
    return new Types.ObjectId(`${string}`)
  }

  async terminate({ reason } = {}) {
    if (!this.db) return

    await this.db.close()
    console.log(`MongoDB: Connection closed (${reason})`)
  }
}

export default BusinessManager
