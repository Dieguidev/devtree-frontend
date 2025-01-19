import { useForm } from "react-hook-form"
import { ErrorFormMessage } from "./ErrorFormMessage"

export const SearchForm = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      handle: ''
    }
  })

  const handle = watch('handle')

  const handleSearch = ()=>{
    console.log(handle);

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

      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Obtener mi DevTree'
      />
    </form>
  )
}
