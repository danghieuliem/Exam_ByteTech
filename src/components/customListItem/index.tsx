'use client'

import { CustomAutocomplete } from '@/components/customAutocomplete'
import { MOCK_DATA, OPERATORS } from '@/constants'
import { Box, Button } from '@mui/material'
import { Moment } from 'moment'
import { useMemo, useState } from 'react'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import FieldValues from './fieldValue'

export type TDataType = 'String' | 'Double' | 'Long' | 'Timestamp'

export type TOperators = typeof OPERATORS

export type TTransDataType = {
  String: keyof TOperators['text']
  Double: keyof TOperators['number']
  Long: keyof TOperators['number']
  Timestamp: keyof TOperators['time']
  // [key in keyof TObjectTransDataType]: TObjectTransDataType[keyof TObjectTransDataType]
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

export type TObjectTransDataType = {
  String: TOperators['text']
  Double: TOperators['number']
  Long: TOperators['number']
  Timestamp: TOperators['time']
}

export const transDataType: TObjectTransDataType = {
  String: OPERATORS.text,
  Double: OPERATORS.number,
  Long: OPERATORS.number,
  Timestamp: OPERATORS.time,
}

type TProps = {
  key: string
  useListDataFrom: UseFormReturn<{
    listData: TItem[]
  }>
  index: number
  remove: UseFieldArrayRemove
}

const CustomListItem = ({ key, useListDataFrom, index, remove }: TProps) => {
  const { control, watch, setValue } = useListDataFrom
  const [currentDataType, setCurrentDataType] = useState<
    keyof TTransDataType | null
  >(null)

  const listOperator = useMemo(() => {
    if (!currentDataType) return []
    const obKeyVal = transDataType[currentDataType]
    return Object.keys(obKeyVal ?? {}).map((key) => ({
      name: obKeyVal[key as keyof typeof obKeyVal],
      key,
    }))
  }, [currentDataType])

  return (
    <Box key={key} className='flex w-full items-center gap-x-4'>
      <Box className='grid grid-cols-3 w-11/12 gap-4'>
        <CustomAutocomplete
          isValueTypeObject={true}
          fullWidth
          control={control}
          options={MOCK_DATA}
          name={`listData.${index}.field`}
          label={'Select field'}
          select={{
            label: 'name',
            value: 'key',
          }}
          rules={{ required: true }}
          onChange={(_, val) => {
            if (!val) {
              setCurrentDataType(null)
            } else {
              setCurrentDataType((val as TField).dataType)
            }
            setValue(`listData.${index}.operators`, null)
            setValue(`listData.${index}.value`, null)
          }}
        />
        <CustomAutocomplete
          fullWidth
          control={control}
          options={listOperator}
          name={`listData.${index}.operators`}
          label={'Operator'}
          rules={{ required: true }}
          select={{
            label: 'name',
            value: 'key',
          }}
          onChange={(val) => {
            if (!val) {
              setValue(`listData.${index}.value`, null)
            }
          }}
          disabled={!watch(`listData.${index}.field`)}
        />
        <FieldValues
          control={control}
          fieldDataType={currentDataType ?? null}
          index={index}
          operator={watch(`listData.${index}.operators`) ?? null}
          disabled={!watch(`listData.${index}.operators`)}
        />
      </Box>
      <Button color='error' variant='contained' onClick={() => remove(index)}>
        Delete
      </Button>
    </Box>
  )
}

export default CustomListItem
