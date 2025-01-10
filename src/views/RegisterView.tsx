import { Link } from "react-router-dom";

export const RegisterView = () => {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>
      <nav>
        <Link className="text-center text-white text-lg block" to="/auth/login">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  );
};
