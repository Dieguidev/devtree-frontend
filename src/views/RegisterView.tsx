import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorFormMessage } from "../components/ErrorFormMessage";
import { RegisterForm } from "../types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { api } from "../config/axios";

export const RegisterView = () => {
  const initialValues: RegisterForm = {
    name: "",
    email: "",
    handle: "",
    password: "",
    passwordConfirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post(
        `/api/auth/register`,
        formData
      );
      toast.success("Cuenta creada con éxito");

      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        //para node
        // console.log(error.response?.data.error);
        //para java
        // console.log(error.response?.data);
        if (error.response?.data.error === "Email already exists" || error.response?.data === "Email already exists") {
          toast.error("El email ya está en uso");
        } else if (error.response?.data.error === "Handle already exists" || error.response?.data === "Handle already exists") {
          toast.error("El handle ya está en uso");
        } else {
          toast.error("Error al crear la cuenta");
        }
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && (
            <ErrorFormMessage>{errors.name?.message}</ErrorFormMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorFormMessage>{errors.email?.message}</ErrorFormMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", { required: "El handle es obligatorio" })}
          />
          {errors.handle && (
            <ErrorFormMessage>{errors.handle?.message}</ErrorFormMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "El password es obligatorio",
              minLength: {
                value: 8,
                message: "El password debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorFormMessage>{errors.password?.message}</ErrorFormMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="passwordConfirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("passwordConfirmation", {
              required: "Es necesario confirmar tu password",
              validate: (value) =>
                value === password || "Los Passwords no coinciden",
            })}
          />
          {errors.passwordConfirmation && (
            <ErrorFormMessage>
              {errors.passwordConfirmation?.message}
            </ErrorFormMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>

      <nav>
        <Link className="text-center text-white text-lg block" to="/auth/login">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  );
};
