import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, updateName } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { Toast } from "../components/Toast";


const Register = () => {
  const [name, setName] = useState("");
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
      await register({ email, password });
      await updateName({name})
      Toast.fire({
        icon: "success",
        title: "Usuario registrado correctamente",
      });
    } catch (error) {
        Toast.fire({
            icon: "error",
            title: error.code,
          });
      console.log(error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <h3 className="text-gray-500 text-xl mb-3 font-semibold">Registrarse</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded py-2 px-4 text-gray-500 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded py-2 px-4 text-gray-500 outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 rounded py-2 px-4 text-gray-500 outline-none"
        />
        <button type="submit" className="rounded bg-gray-500 p-2 text-white">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
