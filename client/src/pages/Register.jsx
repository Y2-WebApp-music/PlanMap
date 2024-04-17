import  { useEffect}  from "react";
import '../global.css'
import './register.css'
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