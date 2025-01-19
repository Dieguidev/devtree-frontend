import { useForm } from "react-hook-form"
import { ErrorFormMessage } from "./ErrorFormMessage"
import slugify from "react-slugify"
import { useMutation } from "@tanstack/react-query"
import { searchIfExistsHandle } from "../api/DevTreeAPI"
import { Link } from "react-router-dom"

export const SearchForm = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      handle: ''
    }
  })

  const mutation = useMutation({
    mutationFn: searchIfExistsHandle,

  })

  const handle = watch('handle')

  const handleSearch = () => {
    const slug = slugify(handle)
    mutation.mutate(slug)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label
          htmlFor="handle"
        >devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />

      </div>
      {errors.handle && (
        <ErrorFormMessage>{errors.handle.message}</ErrorFormMessage>
      )}

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Cargando...</p>}
        {mutation.error && <p className="text-center text-red-600 font-black">Handle en uso</p>}
        {mutation.data && <p className="text-center text-cyan-500 font-black">
          Handle disponible ir a <Link to={'/auth/register'}>Registrarse</Link>
        </p>}

      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Obtener mi DevTree'
      />
    </form>
  )
}
