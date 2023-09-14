import React from "react";
import styles from '../../styles/info-box.module.css';
import { AiOutlineUser } from 'react-icons/ai';
import { TbUsersPlus } from 'react-icons/tb';
import { CgSmartphoneChip } from 'react-icons/cg';

const InfoBox = ({data,type,backgroundColor, title}) => {

    return(
        <div className={styles.container}>
            <div className={styles.icon} style={{backgroundColor}}>
            {type == 'devs' &&(
                <AiOutlineUser color="white" size={30}/>
            )}
            {type == 'recs' &&(
                <TbUsersPlus color="white" size={30}/>
                
                )}
            {type == 'skills' &&(
                <CgSmartphoneChip color="white" size={30}/>
                )}
            {type == 'countries' &&(
                <TbUsersPlus color="white" size={30}/>
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