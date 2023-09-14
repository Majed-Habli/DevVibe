import React from "react";
import styles from '../../styles/info-box.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import { TbUsersPlus } from 'react-icons/tb';
import { FaUserTie } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';

const InfoBox = ({data,type,backgroundColor, title}) => {

    return(
        <div className={styles.container}>
            <div className={styles.icon} style={{backgroundColor}}>
            {type == 'devs' &&(
                <AiOutlineUser color="white" size={30}/>
            )}
            {type == 'user' &&(
                <TbUsersPlus color="white" size={30}/>
                
                )}
            {type == 'recs' &&(
                <FaUserTie color="white" size={30}/>
                )}
            {type == 'matches' &&(
                <FaHandshakeSimple color="white" size={30}/>
            )}

                
            </div>
            <div className={styles.right_container}>
                <span className={styles.span_header}>{title}</span>
                <span className={styles.span_count}>{data}</span>
            </div>
        </div>
    )
}

export default InfoBox;