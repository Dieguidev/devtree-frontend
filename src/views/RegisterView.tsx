import { Link } from "react-router-dom";

export const RegisterView = () => {
  return (
    <>
      <nav>
        <Link to="/auth/login">¿Ya tienes cuenta? Inicia sesión</Link>
      </nav>
    </>
  );
};
