import dbConnect from './db/connection'
import { expenseSchema, equipmentServiceSchema, equipmentSchema, locationSchema } from './db/schema'
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
      this.emit('ready')
    } catch (err) {
      this.emit('error', err.message)
    }
  }

  async addEquipment(props = {}) {
    const equipment = await this.equipment.create(props)
    console.log(equipment)
  }

  async getEquipment(query = {}) {
    const equipment = await this.equipment.find(query, { __v: 0 })
    return JSON.stringify(equipment)
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
