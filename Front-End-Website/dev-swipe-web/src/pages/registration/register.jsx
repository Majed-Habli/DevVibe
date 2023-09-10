import React, {useState} from "react";
import styles from './register.module.css'
import CustomInput from "../../components/custom input/custominput";
import CustomButton from "../../components/custom button/custombutton";

const Register = () =>{
    const [ inputs, setInputs] = useState([]);

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onRegister = () =>{
        console.log(inputs);
    }

    return (
        <div className={styles.container}>
            <div className={styles.comp_container}>
                <div className={styles.title}>Register</div>
                <div className={styles.input_container}>
                    <div className={styles.row}>
                        <CustomInput label={'Name :'} name={'name'} value={inputs.name} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={500}/>
                        <CustomInput label={'Company Name :'} name={'Company_name'} value={inputs.Company_name} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={500}/>
                    </div>
                    <div className={styles.row}>
                        <CustomInput label={'Email :'} name={'email'} value={inputs.email} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={500}/>
                        <CustomInput label={'Country :'} name={'country'} value={inputs.country} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={500}/>
                    </div>
                    <div className={styles.row}>
                        <CustomInput label={'Password :'} name={'password'} value={inputs.password} handleChange={handleChange} width={200} height={38}fontSize={12} fontWeight={500}/>
                        <CustomInput label={'Confirm Password :'} name={'confirm_password'} value={inputs.confirm_password} handleChange={handleChange} width={200} height={38}fontSize={12} fontWeight={500}/>
                    </div>
                </div>
                <div className={styles.cto}>Already have an account? <span>Login now</span></div>
                <div className={styles.button_container}>
                    <CustomButton width={220} height={50} title={'Register'} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={18} fontWeight={600} borderRadius={4} backgroundColor={'#FCC860'} onClick={onRegister}/>
                </div>
            </div>
        </div>
    )
}

export default Register;