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
import { NOTE_STATUS_TYPES } from './enums'

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

  async getDashboardData() {
    const promises = [
      this.locations.countDocuments(),
      this.equipment.countDocuments(),
      this.equipment.countDocuments({ isOperational: false })
    ]
    const [totalLocations, totalMachines, totalNonOperationalMachines] = await Promise.all(promises)

    return { totalLocations, totalMachines, totalNonOperationalMachines }
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

  async getEquipmentServices(query = {}) {
    const services = await this.equipmentServices.find(query, { __v: 0 })
    return JSON.stringify(services)
  }

  async getNotes(query = {}) {
    const note = await this.notes.find(query, { __v: 0 })
    return JSON.stringify(note)
  }

  async toggleNoteStatus(id) {
    const note = await this.notes.findOne({ _id: id })
    note.$set(
      'status',
      note.status === NOTE_STATUS_TYPES.PENDING
        ? NOTE_STATUS_TYPES.RESOLVED
        : NOTE_STATUS_TYPES.PENDING
    )

    await note.save()
    return { ok: true }
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
