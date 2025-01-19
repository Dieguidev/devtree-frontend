import { Link } from "react-router-dom"


export const HomeNavigation = () => {
  return (
    <>
      <Link
        className="text-white p-2 uppercase font-black text-xs cursor-pointer"
        to='/auth/login'
      >Iniciar Sesión</Link>
    </>
  )
}
