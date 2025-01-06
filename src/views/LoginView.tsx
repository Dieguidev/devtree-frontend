import { Link } from "react-router-dom";

export const LoginView = () => {
  return (
    <>
      <nav>
        <Link to="/auth/register">¿No tienes cuenta? Regístrate</Link>
      </nav>
    </>
  );
};
