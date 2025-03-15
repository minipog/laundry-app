import * as yup from 'yup'
import { EQUIPMENT_TYPES, OWNERSHIP_TYPES } from '../../../../../main/lib/enums'

const saveMachineSchema = yup.object().shape({
  type: yup.string().required().oneOf(Object.values(EQUIPMENT_TYPES)),
  data: yup.object().shape({
    model: yup.object().shape({
      serialNumber: yup.string(),
      name: yup.string(),
      capacity: yup.number().required('Required').positive('Must be positive'),
      ownership: yup.object().shape({
        type: yup.string().required().oneOf(Object.values(OWNERSHIP_TYPES)),
        cost: yup.number().required('Required').positive('Must be positive'),
        leaseProvider: yup.string(),
        leasedAt: yup.date()
      })
    }),
    isOperational: yup.bool().required(),
    pricePerWash: yup.number().required('Required').positive('Must be positive')
  })
})

export default saveMachineSchema
