import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { logOut } from "../config/firebase";

const Header = () => {
  const { user } = useUserContext();

  const handleLogOut = async () => {
    await logOut();
  };

  return !user ? (
    <div className="z-50 flex h-[80px] w-full items-center justify-between bg-slate-300 px-8 text-gray-800">
      <div>
        <Link className="cursor-pointer p-2" to="/">
          Logo
        </Link>
      </div>
      <div className="flex gap-5">
        <Link className="cursor-pointer p-2" to="/login">
          Iniciar Sesion
        </Link>
        <Link className="cursor-pointer p-2" to="/register">
          Registrarse
        </Link>
      </div>
    </div>
  ) : (
    <div className="z-50 flex h-[80px] w-full items-center justify-between bg-slate-300 px-8 text-gray-800">
      <div>
        <Link className="cursor-pointer p-2" to="/">
          Logo
        </Link>
      </div>
      <div className="flex gap-2">
        {user.displayName ? (
          <b className="flex items-center gap-2 p-2">
            <img src={user.photoURL} className="h-8 w-8 rounded-full" alt="" />
            {user.displayName}
          </b>
        ) : (
          <b className="flex items-center gap-2 p-2">
            <img src={user.photoURL} className="h-8 w-8 rounded-full" alt="" />

            {user.displayName}
          </b>
        )}

        <button
          onClick={handleLogOut}
          className="cursor-pointer p-2"
          to="/register"
        >
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
};

export default Header;
