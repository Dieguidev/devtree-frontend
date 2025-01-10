import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorFormMessage } from "../components/ErrorFormMessage";

export const RegisterView = () => {

  const initialValues = {
    name: "",
    email: "",
    handle: "",
    password: "",
    passwordConfirmation: "",
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleRegister = () => {
    console.log("desde handleRegister");
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
          { errors.name && <ErrorFormMessage>{errors.name?.message}</ErrorFormMessage>  }
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
            {...register("email", { required: "El email es obligatorio" })}
          />
          { errors.email && <ErrorFormMessage>{errors.email?.message}</ErrorFormMessage>  }
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
          { errors.handle && <ErrorFormMessage>{errors.handle?.message}</ErrorFormMessage>  }
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
            })}
          />
          { errors.password && <ErrorFormMessage>{errors.password?.message}</ErrorFormMessage>  }
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
            })}
          />
          { errors.passwordConfirmation && <ErrorFormMessage>{errors.passwordConfirmation?.message}</ErrorFormMessage>  }

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
