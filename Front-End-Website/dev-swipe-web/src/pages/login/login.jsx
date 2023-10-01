import React, {useState} from "react";
import styles from '../registration/register.module.css';
import CustomInput from "../../components/custom input/custominput";
import CustomButton from "../../components/custom button/custombutton";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import { useEffect } from "react";

const Login = () =>{
    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false)

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const goToPage = () => {
        window.location.href = '/register';
    }

    const onLogin = async (event) =>{
        event.preventDefault();

        try {
            if(!inputs.email || !inputs.password){
                setError('All fields required');
                setIsError(true)
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
    
                if(data.status == 'success'){
                    const token = data.user.token;
                    const id = data.user.id;
                    const userName = data.user.user_name;
                    const profileImageUrl = data.user.profile_image_url;
                    const user_type = data.user.user_type_id;
    
                    localStorageAction("token", token);
                    localStorageAction('user_name', userName);
                    localStorageAction("user_id", id);
                    localStorageAction("user_type", user_type);
                    localStorageAction("profile_image", profileImageUrl);

                    window.location.href = '/dashboard';
                }
            }
            
          } catch (error) {
            setError("Wrong credentials!");
            setIsError(true)
          }
    }

    useEffect(()=>{
        if(isError){
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    },[isError])

    return (
        <div className={styles.container}>
            <div className={`${styles.comp_container} ${styles.comp_width}`}>
                <div className={styles.title}>Login</div>
                <div className={styles.input_container}>
                    <div className={styles.col}>
                        <CustomInput label={'Email'} name={'email'} value={inputs.email} handleChange={handleChange} width={323} height={38} fontSize={12} fontWeight={600}/>
                        <CustomInput type={'password'} label={'Password'} name={'password'} value={inputs.password} handleChange={handleChange} width={323} height={38}fontSize={12} fontWeight={600}/>
                    </div>
                    {isError  && (<div className={styles.error_text}>{error}</div>)}
                </div>
                <div className={styles.cto}>Don't have an account? <span onClick={goToPage}>Register now</span></div>
                <div className={styles.button_container}>
                    <CustomButton width={220} height={50} title={'Login'} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={18} fontWeight={600} borderRadius={4} backgroundColor={'#FCC860'} onClick={onLogin}/>
                </div>
            </div>
        </div>
    )
}

export default Login;