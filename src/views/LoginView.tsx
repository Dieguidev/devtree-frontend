import { Link } from "react-router-dom";

export const LoginView = () => {
  return (
    <>
      <div>LoginView</div>

      <nav>
        <Link to="/auth/register">
        ¿No tienes cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};
