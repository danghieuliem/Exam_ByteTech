import { TTransDataType } from '@/types'
import { Box } from '@mui/material'
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField'
import { useMemo } from 'react'
import { Control, UseControllerProps } from 'react-hook-form'
import { CustomDateTimePicker } from '../customDateTimePicker'
import { CustomDateTimeRangePicker } from '../customDateTimeRangePicker'
import { CustomTextInput } from '../customTextInput'
import { TCustomTextInputProps } from '../customTextInput/customTextInput'
import { CustomTextInputMultiple } from '../customTextInputMultiple'
import { CustomTextInputRange } from '../customTextInputRange'

type TProp<T extends object> = {
  key?: React.Key
  name: UseControllerProps<T>['name']
  classNames?: string
  fieldDataType: keyof TTransDataType | null
  operator: TTransDataType[keyof TTransDataType] | null
  control: Control<T>
  disabled?: boolean
}

const FieldValues = <T extends object>(props: TProp<T>) => {
  const { name, classNames, fieldDataType, operator, control, disabled, key } =
    props

  const listOperator = useMemo(() => {
    const inputProp: TCustomTextInputProps<T> = {
      name,
      control: control,
      label: 'value',
      required: true,
      disabled: disabled,
    }

    if (!operator || !fieldDataType)
      return <CustomTextInput disabled={disabled} {...inputProp} type='text' />

    switch (fieldDataType) {
      case 'String':
        if (
          ['equals', 'notEquals', 'likes', 'notLikes', 'containAll'].includes(
            operator as string,
          )
        ) {
          return (
            <CustomTextInputMultiple
              disabled={disabled}
              rules={{ required: true }}
              name={name}
              control={control}
              label={'value'}
            />
          )
        }
        return <CustomTextInput {...inputProp} type='text' />

      case 'Double':
      case 'Long':
        if (operator === 'between')
          return (
            <CustomTextInputRange
              disabled={disabled}
              required={true}
              name={name}
              control={control}
              label='value'
              type='number'
            />
          )
        return <CustomTextInput {...inputProp} type='number' />

      case 'Timestamp':
        if (operator === 'between')
          return (
            <CustomDateTimeRangePicker
              disabled={disabled}
              rules={{ required: true }}
              name={name}
              control={control}
              slots={{ field: SingleInputDateRangeField }}
              label={'value'}
            />
          )
        return (
          <CustomDateTimePicker
            disabled={disabled}
            rules={{ required: true }}
            name={name}
            control={control}
            label={'value'}
          />
        )

      default:
        return <CustomTextInput {...inputProp} type='text' />
    }
  }, [control, disabled, fieldDataType, name, operator])

  return (
    <Box
      key={key}
      className={'h-full flex flex-col justify-center ' + classNames}
    >
      {listOperator}
    </Box>
  )
}

export default FieldValues
