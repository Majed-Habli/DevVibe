import React from 'react';
import styles from '../../styles/usercard.module.css';
import { RiBuilding2Line } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import CustomButton from '../custom button/custombutton';

const UserCard = ({data}) =>{
    const viewUserProfile = ({id})=>{
        window.location.href = `/dashboard/users/profile/${id}`;

    }

    return(
        <div className={styles.container}>
            <div className={styles.role}>role</div>
            <div className={styles.user_details}>
                <div className={styles.left_container}>
                    <div className={styles.user_name}>{data.user_name}</div>
                    <div className={styles.user_description}><span>About:</span>{data.description}</div>
                    <div className={styles.extra_description}>
                        <div className={styles.row}>
                            <RiBuilding2Line color="#1f2d3d" size={15}/>
                            <div>country: {data.country}</div>
                        </div>
                        <div className={styles.row}>
                            <HiOutlineMail color="#1f2d3d" size={15}/>
                            <div>email: {data.email}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <img src="/fake-profile.png" alt="user-profile" />
                </div>
            </div>
            <div className={styles.cto}>
                <CustomButton title={'view Profile'} width={120} height={30} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={14} fontWeight={600} borderRadius={4} backgroundColor={'#FCC860'} onClick={()=>viewUserProfile({id:data.id})}/>
            </div>
        </div>
    )
}

export default UserCard;