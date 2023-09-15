import React from 'react';
import styles from '../../styles/usercard.module.css';
import CustomButton from '../custom button/custombutton';

const UserCard = () =>{

    return(
        <div className={styles.container}>
            <div className={styles.role}>role</div>
            <div className={styles.user_details}>
                <div className={styles.left_container}>
                    <div className={styles.user_name}>Majed Habli</div>
                    <div className={styles.user_description}><span>About:</span>description description description description description</div>
                    <div className={styles.extra_description}>
                        <div className={styles.row}>
                            <img src="" alt="icon-address" />
                            <div>country</div>
                        </div>
                        <div className={styles.row}>
                            <img src="" alt="icon-email" />
                            <div>email</div>
                        </div>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <img src="/fake-profile.png" alt="user-profile" />
                </div>
            </div>
            <div className={styles.cto}>
                <CustomButton title={'view Profile'}/>
            </div>
        </div>
    )
}

export default UserCard;