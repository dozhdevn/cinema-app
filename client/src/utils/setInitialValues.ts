import { Path, UseFormSetValue } from 'react-hook-form'

export const setInitialValues = <T extends object>(
  data: T,
  setValue: UseFormSetValue<T>,
) => {
  Object.entries(data).forEach(([key, value]) => {
    setValue(key as Path<T>, value)
  })
}
