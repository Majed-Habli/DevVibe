import React, {useState} from "react";
import styles from './register.module.css';
import CustomInput from "../../components/custom input/custominput";
import CustomButton from "../../components/custom button/custombutton";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";

const Register = () =>{
    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState('');
    const [selected, setSelected] = useState(null);

    const onChangeHandler = (option) => {
        setSelected(option)
    };
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const goToPage = () => {
        window.location.href = '/';
    }

    const onRegister = async (event) =>{
        event.preventDefault();

        try {
            if (inputs.password !== inputs.confirm_password){
                setError('Passwords dont match!');
                console.log(error);
            }else if(!inputs.name || !inputs.email || !inputs.password, !inputs.confirm_password || !inputs.country){
                setError('All fields required');
                console.log(error);
            }else{
                console.log(inputs)
                const response = await sendRequest({
                    route: "/guest/register",
                    method: requestMethods.POST,
                    body:{user_name: inputs.name,
                        email: inputs.email,
                        password: inputs.password,
                        country: inputs.country,
                        company_name: inputs.company_name,
                        gender: inputs.gender,
                        user_type_id: selected,}
                });
                const data = response;
                console.log(data)
                const token = " ";
    
                if(data.status == 'Success'){
                    const token = data.data.token;
                    const id = data.data.id;
                    const userName = data.data.user_name;
                    console.log(userName)
                    const profileImageUrl = data.data.profile_image_url;
                    const user_type = data.data.user_type_id;
    
                    localStorageAction("token", token);
                    localStorageAction("user_id", id);
                    localStorageAction("user_type", user_type);
                    localStorageAction('user_name', userName);
                    localStorageAction("profile_image", profileImageUrl);

                    // console.log("here is my token", localStorageAction("token"), localStorageAction("user_id"), "and", localStorageAction("user_type"));
                    window.location.href = `/dashboard/profile/${id}`
                }else{
                    setError('Email already exists!');
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Registration failed:", error);
          }
    }

    return (
        <div className={styles.container}>
            <div className={styles.comp_container}>
                <div className={styles.title_container}>
                    <div className={styles.title}>Register as</div>
                    <div className={styles.button_conatiner}>
                        <div className={styles.boxes}>
                            <input type="checkbox" id="Developer" onChange={()=>onChangeHandler(2)} checked={selected === 2}/>
                            <label htmlFor="Developer">Developer</label>
                        </div>
                        <div className={styles.boxes}>
                            <input type="checkbox" id="3" onChange={()=>onChangeHandler(3)} checked={selected === 3}/>
                            <label htmlFor="3">Recruiter</label>
                        </div>
                    </div>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.row}>
                        <CustomInput label={'Name'} name={'name'} value={inputs.name} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={600}/>
                        {selected == 2 ?(<CustomInput label={'Gender'} name={'gender'} value={inputs.gender} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={500}/>
                        ):(
                            <CustomInput label={'Conpany_name'} name={'company_name'} value={inputs.company_name} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={500}/>
                            )}
                    </div>
                    <div className={styles.row}>
                        <CustomInput label={'Email'} name={'email'} value={inputs.email} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={600}/>
                        <CustomInput label={'Country'} name={'country'} value={inputs.country} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={600}/>
                    </div>
                    <div className={styles.row}>
                        <CustomInput label={'Password'} name={'password'} value={inputs.password} handleChange={handleChange} width={200} height={38}fontSize={12} fontWeight={600}/>
                        <CustomInput label={'Confirm Password'} name={'confirm_password'} value={inputs.confirm_password} handleChange={handleChange} width={200} height={38}fontSize={12} fontWeight={600}/>
                    </div>
                </div>
                <div className={styles.cto}>Already have an account? <span onClick={goToPage}>Login now</span></div>
                <div className={styles.button_container}>
                    <CustomButton width={220} height={50} title={'Register'} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={18} fontWeight={600} borderRadius={4} backgroundColor={'#FCC860'} onClick={onRegister}/>
                </div>
            </div>
        </div>
    )
}

export default Register;