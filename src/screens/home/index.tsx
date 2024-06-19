'use client'

import CustomListItem from '@/components/customListItem'
import { Box, Button } from '@mui/material'
import { DEFAULT_VALUE, useHook } from './hook'

const HomeScreen = () => {
  const { onSubmit, fields, append, remove, useListDataFrom } = useHook()
  return (
    <Box className='text-3xl w-[800px] bg-white p-6 space-y-4 rounded-lg'>
      <Box className='flex gap-4 '>
        <Button
          color='primary'
          variant='contained'
          onClick={() => append({ ...DEFAULT_VALUE })}
        >
          Add item
        </Button>
        <Button color='success' variant='contained' onClick={onSubmit}>
          Submit
        </Button>
      </Box>
      {fields.map((field, index) => (
        <CustomListItem
          key={field.id}
          useListDataFrom={useListDataFrom}
          index={index}
          remove={remove}
        />
      ))}
    </Box>
  )
}

export default HomeScreen
