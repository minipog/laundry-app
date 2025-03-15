import { merge } from 'lodash'

export const getEditableMachineObject = ({ type, data }) => ({
  type,
  data: {
    model: {
      serialNumber: data.model.serialNumber,
      name: data.model.name,
      capacity: data.model.capacity,
      ownership: {
        type: data.model.ownership.type,
        cost: data.model.ownership.cost,
        leaseProvider: data.model.ownership.leaseProvider || '',
        leasedAt: data.model.ownership.leasedAt || ''
      }
    },
    isOperational: data.isOperational,
    pricePerWash: data.pricePerWash
  }
})

export function saveMachine(machine, data) {
  const obj = JSON.stringify(
    merge({}, machine, data),
    (_, value) => (isNaN(parseInt(value)) ? value : +value),
    2
  )

  console.log(obj)
}
