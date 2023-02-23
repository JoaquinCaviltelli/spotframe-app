import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  return (
    <div className="h-[calc(100vh-80px)] w-full  bg-slate-100">
      <h1>home</h1>
    </div>
  );
};

export default Home;
