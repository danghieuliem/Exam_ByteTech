import { FormControl } from '@mui/material'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

type TProps<T extends FieldValues> = DateTimePickerProps<Moment> &
  UseControllerProps<T> & {
    label: string
    fullWidth?: boolean
  }

const CGBDateTimePicker = <T extends object>(props: TProps<T>) => {
  const {
    fullWidth = true,
    label,
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    disabled,
    ...propsSelect
  } = props

  return (
    <FormControl fullWidth={fullWidth}>
      <Controller
        rules={rules}
        shouldUnregister={shouldUnregister}
        name={name}
        control={control}
        defaultValue={defaultValue}
        disabled={disabled}
        render={({ field }) => (
          <DateTimePicker
            {...propsSelect}
            slotProps={{
              ...propsSelect.slotProps,
              textField: {
                size: 'small',
                ...propsSelect.slotProps?.textField,
              },
            }}
            name={name}
            label={label}
            value={moment(field.value)}
            defaultValue={defaultValue}
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              field.onChange(e?.toISOString())
            }}
          />
        )}
      />
    </FormControl>
  )
}

CGBDateTimePicker.displayName = 'CGBDateTimePicker'

export default CGBDateTimePicker
