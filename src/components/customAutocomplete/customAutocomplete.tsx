import { Autocomplete, AutocompleteProps, TextField } from '@mui/material'
import { isArray, isString, isUndefined } from 'lodash'
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

type TProps<T extends FieldValues, K extends object> = Omit<
  AutocompleteProps<K, boolean, boolean, boolean>,
  'renderInput'
> &
  UseControllerProps<T> & {
    label: string
    select: { label: keyof K; value: keyof K }
    control: Control<T>
    isValueTypeObject?: boolean
  }

// ** Document is MUI Autocomplete
const CustomAutocomplete = <T extends object, K extends object>(
  props: TProps<T, K>,
) => {
  const { label, select, ...other } = props
  const {
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    disabled,
    isValueTypeObject,
    ...autocompleteProps
  } = other

  return (
    <Controller
      rules={rules}
      shouldUnregister={shouldUnregister}
      name={name}
      control={control}
      defaultValue={
        isString(defaultValue) ? defaultValue : defaultValue?.[select.value]
      }
      disabled={disabled}
      render={({ field, fieldState }) => {
        return (
          <Autocomplete
            {...field}
            {...autocompleteProps}
            sx={{ py: 1, ...autocompleteProps.sx }}
            id='controllable-states-demo'
            getOptionLabel={(val) => {
              if (!isUndefined(autocompleteProps?.getOptionLabel))
                return autocompleteProps?.getOptionLabel(val)
              return isString(val) ? val : (val[select.label] as string)
            }}
            getOptionKey={(val) =>
              isString(val) ? val : (val[select.value] as string)
            }
            defaultValue={defaultValue}
            {...(autocompleteProps.multiple
              ? {
                  value:
                    autocompleteProps.options.filter((e) => {
                      return (field.value as string[])?.includes(
                        e[select.value] as string,
                      )
                    }) ?? [],
                }
              : {
                  value: autocompleteProps.options.find((e) => {
                    return e[select.value] === field.value
                  }),
                })}
            renderInput={(params) => (
              <TextField
                {...params}
                size={params.size || 'small'}
                name={name}
                label={label}
                error={!!fieldState.error}
              />
            )}
            onChange={(event, value, reason, details) => {
              autocompleteProps?.onChange?.(event, value, reason, details)
              isValueTypeObject
                ? field.onChange(value)
                : isArray(value)
                  ? field.onChange(
                      (value as K[])?.map((e) => e?.[select.value]),
                    )
                  : field.onChange((value as K)?.[select.value])
            }}
          />
        )
      }}
    />
  )
}

export default CustomAutocomplete
