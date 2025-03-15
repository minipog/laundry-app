import { Schema } from 'mongoose'
import { EQUIPMENT_TYPES, EXPENSE_TYPES, OWNERSHIP_TYPES, SERVICE_TYPES } from '../../enums'

export const expenseSchema = new Schema({
  lid: Schema.Types.ObjectId,
  type: { type: String, required: true, enum: Object.values(EXPENSE_TYPES) },
  amount: { type: Number, required: true, min: 0 }
})

export const equipmentServiceSchema = new Schema({
  lid: Schema.Types.ObjectId,
  mid: Schema.Types.ObjectId,
  type: { type: String, required: true, enum: Object.values(SERVICE_TYPES) },
  date: { type: Date, required: true, default: () => Date.now() },
  provider: {
    name: String,
    contact: String
  },
  description: String
})

export const equipmentSchema = new Schema({
  lid: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, required: true, enum: Object.values(EQUIPMENT_TYPES) },
  serialNumber: String,
  name: String,
  capacity: { type: Number, min: 0 },
  minutesPerCycle: { type: Number, min: 0 },
  powerUsagePerCycle: { type: Number, min: 0 },
  waterUsagePerCycle: { type: Number, min: 0 },
  pricePerCycle: { type: Number, min: 0 },
  ownership: {
    type: { type: String, required: true, enum: Object.values(OWNERSHIP_TYPES) },
    lease: { provider: String, startDate: Date, endDate: Date },
    cost: { type: Number, min: 0 }
  },
  serviceHistory: { type: [equipmentServiceSchema], default: [] },
  isOperational: { type: Boolean, required: true }
})

export const locationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  openingDate: { type: Date, required: true, default: () => Date.now() },
  expenses: { type: [expenseSchema], default: [] },
  equipment: { type: [equipmentSchema], default: [] }
})
