import React from "react";
import styles from './register.module.css'
import CustomInput from "../../components/custom input/custominput";
import CustomButton from "../../components/custom button/custombutton";

const Register = () =>{

    return (
        <div className={styles.container}>
            <div className={styles.comp_container}>
                <div className={styles.title}>Register</div>
                <div className={styles.input_container}>
                    <div className={styles.row}>
                        <CustomInput label={'Name :'} width={200} height={38} fontSize={12} fontWeight={500}/>
                        <CustomInput label={'Company Name :'} width={200} height={38} fontSize={12} fontWeight={500}/>
                    </div>
                    <div className={styles.row}>
                        <CustomInput label={'Email :'} width={200} height={38} fontSize={12} fontWeight={500}/>
                        <CustomInput label={'Country :'} width={200} height={38} fontSize={12} fontWeight={500}/>
                    </div>
                    <div className={styles.row}>
                        <CustomInput label={'Password :'} width={200} height={38}fontSize={12} fontWeight={500}/>
                        <CustomInput label={'Confirm Password :'} width={200} height={38}fontSize={12} fontWeight={500}/>
                    </div>
                </div>
                <div className={styles.cto}>Already have an account? <span>Login now</span></div>
                <div className={styles.button_container}>
                    <CustomButton width={220} height={50} title={'Register'} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={18} fontWeight={600} borderRadius={4} backgroundColor={'#FCC860'}/>
                </div>
            </div>
        </div>
    )
}

export default Register;