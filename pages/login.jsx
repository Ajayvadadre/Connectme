import { Layout } from "../src/components";
import  Login  from "../src/components/Login/login";

const Logins = () => {
    
    return (
        <Layout title={`${true ? "Login" : "Sign Up"}`}>
            <Login />
        </Layout> 
    );
};

export default Logins;
