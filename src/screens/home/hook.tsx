import { TItem } from '@/components/customListItem'
import { isArray } from 'lodash'
import { isMoment, Moment } from 'moment'
import { useCallback } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

export const DEFAULT_VALUE: TItem = {
  field: null,
  operators: null,
  value: null,
}

export const useHook = () => {
  const useListDataFrom = useForm<{ listData: TItem[] }>({
    defaultValues: {
      listData: [{ ...DEFAULT_VALUE }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: useListDataFrom.control,
    name: 'listData',
  })

  const handelSubmit: SubmitHandler<{
    listData: TItem[]
  }> = (data) => {
    const formatData = data.listData.map((e) => {
      if (isArray(e.value) && isMoment(e.value[0]))
        return {
          ...e,
          value: [
            e.value[0].toISOString(),
            (e.value[1] as Moment).toISOString(),
          ],
        }
      return e
    })
    // eslint-disable-next-line no-console
    console.log(formatData)
  }

  const onSubmit = useCallback(() => {
    void useListDataFrom.handleSubmit(handelSubmit)()
  }, [useListDataFrom])

  return { onSubmit, fields, append, remove, useListDataFrom }
}
