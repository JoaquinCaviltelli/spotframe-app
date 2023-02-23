import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signInWithGoogle } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { Toast } from "../components/Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      Toast.fire({
        icon: "success",
        title: "Ingreso correctamente",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.code,
      });
      console.log(error);
      console.log(error.code);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-wrap items-center justify-between bg-[#00000029] md:bg-slate-200">
      <form
        onSubmit={handleSubmit}
        className="m-auto flex w-2/4 max-w-[500px] flex-col gap-1 p-10"
      >
        <h3 className="mb-3 text-xl font-semibold text-gray-500">
          Iniciar Sesion
        </h3>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded py-2 px-4 text-gray-500 outline-none"
        />
        <input
          type="text"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 rounded py-2 px-4 text-gray-500 outline-none"
        />
        <button className="rounded bg-gray-500 p-2 text-white" type="submit">
          Iniciar Sesion
        </button>
        <button
          type="button"
          className="rounded bg-red-700 p-2 text-white"
          onClick={signInWithGoogle}
        >
          Iniciar con Google
        </button>
      </form>
      <div className="absolute -z-10 h-full w-full bg-[url(https://cdn.pixabay.com/photo/2016/11/24/20/30/architecture-1857175_1280.jpg)] bg-cover md:w-2/4 md:relative"></div>
    </div>
  );
};

export default Login;
