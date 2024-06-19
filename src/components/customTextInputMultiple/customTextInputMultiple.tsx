import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  TextField,
  createFilterOptions,
} from '@mui/material'
import { Fragment } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

type TProps<T extends FieldValues> = Omit<
  AutocompleteProps<string, boolean, boolean, boolean>,
  'renderInput' | 'options'
> &
  UseControllerProps<T> & {
    label: string
    control: Control<T>
  }

// ** Document is MUI Autocomplete
const CustomTextInputMultiple = <T extends object>(props: TProps<T>) => {
  const { label, ...other } = props
  const {
    name,
    rules,
    shouldUnregister,
    control,
    disabled,
    ...autocompleteProps
  } = other

  const filter = createFilterOptions<string>()

  return (
    <Controller
      rules={rules}
      shouldUnregister={shouldUnregister}
      name={name}
      control={control}
      defaultValue={[] as never}
      disabled={disabled}
      render={({ field, fieldState }) => {
        return (
          <Autocomplete
            {...field}
            {...autocompleteProps}
            sx={{ py: 1, ...autocompleteProps.sx }}
            id='controllable-states-demo'
            value={field.value ?? []}
            onChange={(_, newValue) => {
              field.onChange(newValue)
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params as never)
              const { inputValue } = params
              const inputValueTrimmed = inputValue.trim()
              const isExisting = options.some(
                (option) => inputValueTrimmed === option,
              )

              if (inputValueTrimmed.trim() !== '' && !isExisting) {
                filtered.push(inputValueTrimmed)
              }

              return filtered
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Fragment key={index}>
                  <Chip {...getTagProps({ index })} label={option} />
                </Fragment>
              ))
            }}
            options={[]}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            renderInput={(params) => (
              <TextField
                {...params}
                size={params.size || 'small'}
                name={name}
                label={label}
                error={!!fieldState.error}
              />
            )}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            fullWidth
            multiple
            freeSolo
          />
        )
      }}
    />
  )
}

export default CustomTextInputMultiple
