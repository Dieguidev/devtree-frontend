import { useForm } from "react-hook-form";
import { ErrorFormMessage } from "../components/ErrorFormMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";



export const ProfileView = () => {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description || '',
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      if (error.message === 'Handle already exists') {
        toast.error('El handle ya existe');
      }
    },
    onSuccess: () => {
      toast.success('Perfil actualizado');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      console.log(error);

    },
    onSuccess: (data) => {
      console.log(data);

    }
  })

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log('aqui');

      uploadImageMutation.mutate(e.target.files[0]);

    }

  }

  const handleUserProfileForm = (formData: ProfileForm) => {
    console.log(formData);

    updateProfileMutation.mutate(formData);
  }

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="handle"
        >Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register('handle', {
            required: "El nombre de usuario es obligatorio",
          })}
        />
        {errors.handle && <ErrorFormMessage>{errors.handle.message}</ErrorFormMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="description"
        >Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="handle"
        >Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Guardar Cambios'
      />
    </form>
  )
}
