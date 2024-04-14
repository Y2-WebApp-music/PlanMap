import  { useEffect}  from "react";
import '../global.css'
import './register.css'
import Navbar from "../components/Navbar";
import RegisterForm from "../components/Register/Registerform";

function Register() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return(
        <>
        <Navbar/>
        <div className="registerflex">
            <div></div>
            <h1>เที่ยวหนายยย</h1>
            <RegisterForm />
            <div></div>
        </div>
        </>
    )
}
export default Register;