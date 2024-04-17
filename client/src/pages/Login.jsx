import  { useEffect}  from "react";
import '../global.css'
import './login.css'
import LoginForm from "../components/Login/Loginform";

function login() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return(
        <>
        <div className="loginflex">
            <div></div>
            <h1>เที่ยวหนายยย</h1>
            <LoginForm />
            <div></div>
        </div>
        </>
    )
}
export default login;