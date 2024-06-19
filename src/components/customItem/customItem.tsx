'use client'

import { CustomAutocomplete } from '@/components/customAutocomplete'
import { MOCK_DATA, OPERATORS } from '@/constants'
import { TField, TItem, TObjectTransDataType, TTransDataType } from '@/types'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { isString } from 'lodash'
import { useMemo, useState } from 'react'
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { IconDeleteOutlineIcon } from '../icons'
import FieldValues from './fieldValue'

export const transDataType: TObjectTransDataType = {
  String: OPERATORS.text,
  Double: OPERATORS.number,
  Long: OPERATORS.number,
  Timestamp: OPERATORS.time,
}

type TProps = {
  useListDataFrom: UseFormReturn<{
    listData: TItem[]
  }>
  index: number
  remove: UseFieldArrayRemove
}

const CustomItem = ({ useListDataFrom, index, remove }: TProps) => {
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
    <Box className='flex w-full items-center gap-x-4 justify-between'>
      <Tooltip title='Index'>
        <Typography className='text-primary font'>{index + 1}.</Typography>
      </Tooltip>
      <Box className='grid grid-cols-3 w-11/12 gap-4 items-center'>
        <CustomAutocomplete
          autoFocus
          isValueTypeObject={true}
          getOptionLabel={(option) => {
            if (isString(option)) return option
            return `${option.name} - ${option.dataType}`
          }}
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
          key={watch(`listData.${index}.operators`)}
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
          onChange={() => {
            setValue(`listData.${index}.value`, null)
          }}
          disabled={!watch(`listData.${index}.field`)}
        />
        <FieldValues
          control={control}
          fieldDataType={currentDataType ?? null}
          name={`listData.${index}.value`}
          operator={watch(`listData.${index}.operators`) ?? null}
          disabled={!watch(`listData.${index}.operators`)}
        />
      </Box>
      <Tooltip title='Delete'>
        <IconButton className='text-primary' onClick={() => remove(index)}>
          <IconDeleteOutlineIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default CustomItem
