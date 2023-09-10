import React, {useState} from "react";
import styles from './register.module.css';
// import axios from 'axios';
import CustomInput from "../../components/custom input/custominput";
import CustomButton from "../../components/custom button/custombutton";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";

const Login = () =>{
    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onLogin = async (event) =>{
        event.preventDefault();

        try {
            if(!inputs.name || !inputs.email){
                setError('All fields required');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "/guest/login",
                    method: requestMethods.POST,
                    body:{email: inputs.email,
                        password: inputs.password,
                        }
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'Success'){
                    const token = data.data.token;
                    const id = data.data.id;
                    const user_type = data.data.user_type_id;
    
                    localStorageAction("token", token);
                    localStorageAction("user_id", id);
                    localStorageAction("user_type", user_type);
                    // console.log(data.data.token)
                    console.log("here is my token", localStorageAction("token"), localStorageAction("user_id"), "and", localStorageAction(user_type));
                    // window.location.href = ''
                }else{
                    setError("Email Doesn't exists!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Login failed:", error);
          }
    }

    return (
        <div className={styles.container}>
            <div className={styles.comp_container}>
                <div className={styles.title}>Login</div>
                <div className={styles.input_container}>
                    <div className={styles.row}>
                        <CustomInput label={'Email :'} name={'email'} value={inputs.email} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={500}/>
                        <CustomInput label={'Password :'} name={'password'} value={inputs.password} handleChange={handleChange} width={200} height={38}fontSize={12} fontWeight={500}/>
                    </div>
                </div>
                <div className={styles.cto}>Don't have an account? <span>Register now</span></div>
                <div className={styles.button_container}>
                    <CustomButton width={220} height={50} title={'Login'} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={18} fontWeight={600} borderRadius={4} backgroundColor={'#FCC860'} onClick={onLogin}/>
                </div>
            </div>
        </div>
    )
}

export default Login;