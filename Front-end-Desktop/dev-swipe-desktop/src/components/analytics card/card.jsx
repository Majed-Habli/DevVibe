import React from "react";
import styles from '../../styles/analytics-card.module.css';
import { TbUsersPlus } from 'react-icons/tb';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { TbDeviceDesktopCode } from 'react-icons/tb';
import { CgSmartphoneChip } from 'react-icons/cg';
import { BiWorld } from 'react-icons/bi';
import { Navigate, useNavigate } from "react-router-dom";

const AnalyticsCard = ({data,type,backgroundColor, color, title, location}) => {
    const nav = useNavigate();

    const gotToPage = () => {
        nav(`/${location}`);
    }
    
    return(
        <div className={styles.container}>
             <div>
                <div className={styles.top_container} style={{backgroundColor}}>
                    <div className={styles.left_container}>
                        <div className={styles.number_container}>{data}</div>
                        <div className={styles.statement}>{title}</div>
                    </div>
                    <div className={styles.right_container}>
                        {type == 'devs' &&(
                            <TbDeviceDesktopCode color={color} size={80}/>
                        )}
                        {type == 'recs' &&(
                            <TbUsersPlus color={color} size={80}/>
                        )}
                        {type == 'skills' &&(
                            <CgSmartphoneChip color={color} size={80}/>
                        )}
                        {type == 'countries' &&(
                            <BiWorld color={color} size={80}/>
                        )}
                    </div>
                </div>
                <div className={styles.cta} style={{backgroundColor:color}} onClick={()=>gotToPage()}>
                    <span>More info</span>
                    <BsFillArrowRightCircleFill fill="white" color="white" size={14}/>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsCard;