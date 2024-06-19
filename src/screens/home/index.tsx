'use client'

import { CustomItem } from '@/components/customItem'
import { Box, Button } from '@mui/material'
import { Fragment } from 'react'
import { DEFAULT_VALUE, useHook } from './hook'

const HomeScreen = () => {
  const { onSubmit, fields, append, remove, useListDataFrom } = useHook()
  return (
    <Box className='text-3xl w-[1000px] bg-white p-6 space-y-4 rounded-lg'>
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
        <Fragment key={field.id}>
          <CustomItem
            useListDataFrom={useListDataFrom}
            index={index}
            remove={remove}
          />
        </Fragment>
      ))}
    </Box>
  )
}

export default HomeScreen
