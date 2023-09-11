import React, {useState,useEffect} from "react";
import styles from './editform.module.css';
import CustomImageButton from "../../custom button/customImageButton";
import PopUpCard from "../../popup card/popupcard";
import CustomInput from "../../custom input/custominput";
import CustomButton from "../../custom button/custombutton";

const EditForm = ({isOpen}) =>{

    const [search, setSearch] = useState('');
    const [ischecked, setIsChecked] = useState([]);

    useEffect(()=>{
        // getRecipes();
        // searchFor(search);
    },[]);

    const inputChange = (event) => {
        setSearch(event.target.value);
        // searchFor();
    };
    
    const hideModel =() =>{
        isOpen(prev => !prev);
    }

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>Edit profile</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel}/>
            </div>
            <div className={styles.popup_body}>
                <CustomInput label={"Name"} width={275} height={35}/>
                <CustomInput label={"Description"} width={'100%'} textArea={true} height={135}/>
                <div className={styles.skill_container}>
                    <div className={styles.header}>Skills</div>
                    <div className={styles.scrollable_container}>
                        <CustomImageButton text={'blender'} image_name={'Close.png'} display={'flex'} flexDirection={'row-reverse'} alignItems={'center'} backgroundColor={'#C2D0FF'} padding={'0.6rem 1rem'} borderRadius={8} image_height={18} image_width={18} width={'fit-content'}/>
                    </div>
                </div>
                <div className={styles.searchable}>
                    <div className={styles.top_bar}>
                        <input type="text" placeholder="Search skills here..." value={search} onChange={inputChange}/>
                    </div>
                    <div className={styles.skill_display}>
                        <div className={styles.box}>
                            <input id={'lable'} type="checkbox" name="blender"/>
                            <label htmlFor={'blender'}> Blender</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.button_container}>
                <CustomButton title={'save'} backgroundColor={'#E7B54F'} width={90} height={30} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4}/>
            </div>
        </div>
    )
}

export default EditForm;