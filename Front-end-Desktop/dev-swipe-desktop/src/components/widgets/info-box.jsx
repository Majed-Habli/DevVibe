import React from "react";
import styles from '../../styles/info-box.module.css';
import { AiOutlineUser } from 'react-icons/ai';

const InfoBox = () => {

    return(
        <div className={styles.container}>
            <div className={styles.icon}>
                <AiOutlineUser fill="white" />
            </div>
            <div className={styles.right_container}>
                <span className={styles.span_header}>Info header</span>
                <span className={styles.span_count}>count</span>
            </div>
        </div>
    )
}

export default InfoBox;