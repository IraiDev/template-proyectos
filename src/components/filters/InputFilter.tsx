import { ChangeEvent } from "react"
import { Path, SubmitHandler } from "react-hook-form"
import { useForm, useSearchParams } from "@utils/hooks"
import sp from "@configs/searchParams"

const { page } = sp

interface Props<T extends object> {
  label: string
  name: Path<T>
  isLoading: boolean
}

export function InputFilter<T extends object>({ name, isLoading }: Props<T>) {
  const { searchParams, setSearchParams, getSearchParam } = useSearchParams()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      [name]: getSearchParam(name),
    },
  })

  const onSubmit: SubmitHandler<Record<string, any>> = (values) => {
    const isEmpty = values[name].length === 0
    isEmpty ? searchParams.delete(name) : searchParams.set(name, values[name])
    searchParams.set(page.query, page.default)
    setSearchParams(searchParams)
  }

  const handleFilterOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    if (!value) {
      searchParams.delete(name)
    } else {
      searchParams.set(name, value)
    }

    if (searchParams.get(page.query) && value !== "") {
      searchParams.set(page.query, page.default)
    }
    setSearchParams(searchParams)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center w-full">
      <input
        disabled={isLoading}
        autoCapitalize="off"
        placeholder="Filtrar:"
        {...register(name, { onBlur: handleFilterOnBlur })}
      />
      <input hidden type="submit" />
    </form>
  )
}
