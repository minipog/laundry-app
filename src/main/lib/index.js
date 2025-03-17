import dbConnect from './db/connection'
import { expenseSchema, equipmentServiceSchema, equipmentSchema, locationSchema } from './db/schema'
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

  async getEquipment(query) {
    const equipment = await this.equipment.find({})
    return JSON.stringify(equipment)
  }

  async terminate({ reason } = {}) {
    if (!this.db) return

    await this.db.close()
    console.log(reason, '\nMongoDB: Connection closed')
  }
}

export default BusinessManager
