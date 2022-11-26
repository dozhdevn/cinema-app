import { useIsFocused } from '@react-navigation/native'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { SearchFormData } from '../interfaces'
import { useDebounce } from './useDebounce'

export const useSearch = () => {
  const isFocused = useIsFocused()
  const { control, watch, reset } = useForm<SearchFormData>({
    mode: 'onChange',
    defaultValues: {
      searchTerm: '',
    },
  })

  const searchTerm = watch('searchTerm')
  const debouncedSearch = useDebounce(searchTerm, 1000)

  useEffect(() => {
    if (!isFocused) {
      reset()
    }
  }, [isFocused])

  return useMemo(
    () => ({ debouncedSearch, reset, control, searchTerm }),
    [searchTerm, debouncedSearch]
  )
}
