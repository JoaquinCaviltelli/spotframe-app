import { useUserContext } from "../context/UserContext";


const Dashboard = () => {

    const { user } = useUserContext();

    

    return (
        <>
        <h1>Dashboard {user.displayName ? user.displayName : user.email }</h1>
        </>
    )
};

export default Dashboard;
