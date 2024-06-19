import { FormControl } from '@mui/material'
import { DateRangePicker, DateRangePickerProps } from '@mui/x-date-pickers-pro'
import { Moment } from 'moment'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

type TProps<T extends FieldValues> = DateRangePickerProps<Moment> &
  UseControllerProps<T> & {
    label: string
    fullWidth?: boolean
  }

const CustomDateTimeRangePicker = <T extends object>(props: TProps<T>) => {
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
          <DateRangePicker
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
            value={field.value ?? [null, null]}
            defaultValue={defaultValue}
            onChange={(e) => {
              field.onChange(e)
            }}
          />
        )}
      />
    </FormControl>
  )
}

CustomDateTimeRangePicker.displayName = 'CustomDateTimeRangePicker'

export default CustomDateTimeRangePicker
