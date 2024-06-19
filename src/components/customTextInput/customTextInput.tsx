import React from 'react'

import { TextField, TextFieldProps } from '@mui/material'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

export type TCustomTextInputProps<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    ref?: React.Ref<HTMLInputElement>
    typeValue?: 'string' | 'number'
  }

const CustomTextInput = <T extends object>(props: TCustomTextInputProps<T>) => {
  const {
    typeValue = 'string',
    name,
    control,
    rules,
    disabled,
    shouldUnregister,
    defaultValue,
    required,
    ref,
    ...other
  } = props

  const { field, fieldState } = useController({
    name,
    control,
    rules: { ...rules, ...(required ? { required: true } : {}) },
    disabled,
    shouldUnregister,
    defaultValue,
  })

  return (
    <TextField
      {...other}
      sx={{ my: 1, ...other.sx }}
      size={other.size || 'small'}
      error={fieldState.invalid}
      ref={ref}
      onBlur={field.onBlur}
      value={field.value ?? ''}
      name={field.name}
      inputRef={field.ref}
      disabled={field.disabled}
      defaultValue={defaultValue}
      required={required}
      // number
      onChange={(e) => {
        if (typeValue === 'number')
          return field.onChange({
            ...e,
            target: { ...e.target, value: Number(e.target.value) },
          })
        field.onChange(e)
      }}
      {...(typeValue === 'number' ? { inputProps: { type: 'number' } } : {})}
    />
  )
}

export default CustomTextInput
