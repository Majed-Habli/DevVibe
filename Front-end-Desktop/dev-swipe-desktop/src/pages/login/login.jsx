import React, {useState} from "react";
import styles from '../../styles/login.module.css';
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

    const goToPage = () => {
        window.location.href = '/register';
    }

    const onLogin = async (event) =>{
        event.preventDefault();

        try {
            if(!inputs.email || !inputs.password){
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
                console.log("res", response)
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
            <div className={styles.header}>
                <img src="/Logo1-0.png" alt="logo" />
            </div>
            <div className={styles.box_conatiner}>
                <div className={styles.comp_container}>
                    <div className={styles.title}>Login</div>
                    <div className={styles.input_container}>
                        <div className={styles.col}>
                            <CustomInput label={'Email'} name={'email'} value={inputs.email} handleChange={handleChange} width={323} height={38} fontSize={12} fontWeight={600}/>
                            <CustomInput type={'password'} label={'Password'} name={'password'} value={inputs.password} handleChange={handleChange} width={323} height={38}fontSize={12} fontWeight={600}/>
                        </div>
                    </div>
                    <div className={styles.button_container}>
                        <CustomButton width={220} height={50} title={'Login'} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={18} fontWeight={600} borderRadius={4} backgroundColor={'#FCC860'} onClick={onLogin}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;