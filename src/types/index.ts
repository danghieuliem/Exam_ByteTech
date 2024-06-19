import { OPERATORS } from '@/constants'
import { Moment } from 'moment'

export type TOperators = typeof OPERATORS

export type TTransDataType = {
  String: keyof TOperators['text']
  Double: keyof TOperators['number']
  Long: keyof TOperators['number']
  Timestamp: keyof TOperators['time']
}

export type TField = {
  key: string
  sysIndexKey: string
  name: string
  dataType: keyof TTransDataType
  refType: string | null
  ctxMasterDataRef: string | null
}

export type TItem = {
  field: TField | null
  operators: TTransDataType[keyof TTransDataType] | null
  value: string | string[] | [Moment, Moment] | null
}

export type TListItem = { listData: TItem[] }

export type TObjectTransDataType = {
  String: TOperators['text']
  Double: TOperators['number']
  Long: TOperators['number']
  Timestamp: TOperators['time']
}
