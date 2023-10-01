import React, {useState,useEffect} from "react";
import styles from './register.module.css';
import CustomInput from "../../components/custom input/custominput";
import CustomButton from "../../components/custom button/custombutton";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import Select from 'react-select';

const Register = () =>{
    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState('');
    const [selected, setSelected] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [isError, setIsError] = useState(false);

    const onChangeGenderHandel = (selectedOption) =>{
        setSelectedGender(selectedOption);
    }

    console.log(selectedGender)

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

    const options = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ];

    const onRegister = async (event) =>{
        event.preventDefault();

        try {
            if (inputs.password !== inputs.confirm_password){
                setError('Passwords dont match!');
                setIsError(true)
                console.log(error);
            }else if(!inputs.name || !inputs.email || !inputs.password, !inputs.confirm_password || !inputs.country){
                setError('All fields required');
                setIsError(true)
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
                        gender: selectedGender.value,
                        user_type_id: selected,}
                });
                const data = response;
                console.log(data)
                const token = " ";
    
                if(data.status == 'Success'){
                    const token = data.data.token;
                    const id = data.data.id;
                    const userName = data.data.user_name;
                    const profileImageUrl = data.data.profile_image_url;
                    const user_type = data.data.user_type_id;
    
                    localStorageAction("token", token);
                    localStorageAction("user_id", id);
                    localStorageAction("user_type", user_type);
                    localStorageAction('user_name', userName);
                    localStorageAction("profile_image", profileImageUrl);

                    window.location.href = `/dashboard/profile/${id}`
                }else{
                    setError('Email already exists!');
                    setIsError(true)
                    console.log(error);
                }
            }
            
          } catch (error) {
                setIsError(true)
                console.error("Registration failed:", error);
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
                        {selected == 2 ?(
                        <Select
                            value={selectedGender}
                            onChange={onChangeGenderHandel}
                            options={options}
                            styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                  width: '200px',
                                  borderColor: '#9F8484'
                                }),
                            
                                menu: (provided, state) => ({
                                  ...provided,
                                  width: '200px',
                                  borderColor: state.isFocused ? 'black' : 'grey'
                                }),
                              }}
                        />
                        ):(
                            <CustomInput label={'Conpany_name'} name={'company_name'} value={inputs.company_name} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={600}/>
                            )}
                    </div>
                    <div className={styles.row}>
                        <CustomInput label={'Email'} name={'email'} value={inputs.email} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={600}/>
                        <CustomInput label={'Country'} name={'country'} value={inputs.country} handleChange={handleChange} width={200} height={38} fontSize={12} fontWeight={600}/>
                    </div>
                    <div className={styles.row}>
                        <CustomInput type={'password'} label={'Password'} name={'password'} value={inputs.password} handleChange={handleChange} width={200} height={38}fontSize={12} fontWeight={600}/>
                        <CustomInput type={'password'} label={'Confirm Password'} name={'confirm_password'} value={inputs.confirm_password} handleChange={handleChange} width={200} height={38}fontSize={12} fontWeight={600}/>
                    </div>
                </div>
                {isError  && (<div className={styles.error_text}>{error}</div>)}
                <div className={styles.cto}>Already have an account? <span onClick={goToPage}>Login now</span></div>
                <div className={styles.button_container}>
                    <CustomButton width={220} height={50} title={'Register'} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={18} fontWeight={600} borderRadius={4} backgroundColor={'#FCC860'} onClick={onRegister}/>
                </div>
            </div>
        </div>
    )
}

export default Register;