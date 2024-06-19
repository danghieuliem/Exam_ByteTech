import { Box, FormControl, TextField, TextFieldProps } from '@mui/material'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

type TProps<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    onChange?: (newValue: string[]) => void
    ref?: React.Ref<HTMLInputElement>
    typeValue?: 'string' | 'number'
  }

const CustomTextInputRange = <T extends object>(props: TProps<T>) => {
  const {
    onChange,
    fullWidth = true,
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    disabled,
    ref,
    ...other
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
        render={({ field, fieldState }) => {
          const value: string[] = field.value ?? ['', '']
          const inputProp: TextFieldProps = {
            ...other,
            sx: { my: 1, ...other.sx },
            size: other.size || 'small',
            error: fieldState.invalid,
            ref: ref,
            onBlur: field.onBlur,
            value: field.value ?? '',
            name: field.name,
            inputRef: field.ref,
            disabled: field.disabled,
            defaultValue: defaultValue,
            ...(other.typeValue === 'number'
              ? { inputProps: { type: 'number' } }
              : {}),
          }
          return (
            <Box>
              <Box className='flex gap-2'>
                <TextField
                  {...inputProp}
                  label={'Value 1'}
                  value={value?.[0] ?? ''}
                  onChange={(e) => {
                    const newVal = [...value]
                    if (other.typeValue !== 'number') {
                      newVal[0] = e.target.value
                      onChange?.(newVal)
                      return field.onChange(newVal)
                    }
                    newVal[0] = {
                      ...e,
                      target: { ...e.target, value: Number(e.target.value) },
                    } as never
                    onChange?.(newVal)
                    field.onChange(newVal)
                  }}
                />
                <TextField
                  {...inputProp}
                  label={'Value 2'}
                  value={value?.[1] ?? ''}
                  onChange={(e) => {
                    const newVal = [...value]
                    if (other.typeValue !== 'number') {
                      newVal[1] = e.target.value
                      onChange?.(newVal)
                      return field.onChange(newVal)
                    }
                    newVal[1] = {
                      ...e,
                      target: { ...e.target, value: Number(e.target.value) },
                    } as never
                    onChange?.(newVal)
                    field.onChange(newVal)
                  }}
                />
              </Box>
            </Box>
          )
        }}
      />
    </FormControl>
  )
}

export default CustomTextInputRange
