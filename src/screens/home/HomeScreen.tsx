'use client'
import { CustomItem } from '@/components/customItem'
import { IconAddCircleOutlineIcon, IconSendIcon } from '@/components/icons'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { Fragment } from 'react'
import { DEFAULT_VALUE, useHook } from './hook'

const HomeScreen = () => {
  const { onSubmit, fields, append, remove, useListDataFrom } = useHook()
  return (
    <Box className='text-3xl w-[1000px] bg-white p-6 space-y-4 rounded-lg'>
      <Box className='flex gap-4 justify-between font-bold'>
        <Box className='flex items-center gap-4'>
          <Box
            component={'img'}
            className='rounded-md'
            height={50}
            src={'/assets/pangoCDP-logo.jpeg'}
            alt={'pangoCDP logo'}
          />
          <Typography className='text-primary font-bold text-xl'>
            PangoCDP - Exam
          </Typography>
        </Box>
        <Box>
          <Tooltip title='Add item'>
            <IconButton
              className='text-primary'
              onClick={() => append({ ...DEFAULT_VALUE })}
            >
              <IconAddCircleOutlineIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Submit'>
            <IconButton className='text-primary' onClick={onSubmit}>
              <IconSendIcon />
            </IconButton>
          </Tooltip>
        </Box>
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
