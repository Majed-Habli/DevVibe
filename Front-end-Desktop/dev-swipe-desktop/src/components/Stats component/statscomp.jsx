import React, { useEffect, useState } from "react";
import styles from '../../styles/headercard.module.css';
import SyncLoader from "react-spinners/ClipLoader";

const StatsComp = ({data, stats}) =>{

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(!data){
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }else{
            setLoading(false)
        }
    },[data])

    return(           
        <>
        <div className={styles.stats_container}>
            {!loading ?(
            <div className={styles.container_body}>
                <div className={styles.top_section}>
                    <div className={styles.section_header}>Stats</div>
                    <div className={styles.body_section}>
                        <div className={styles.user_details}>
                            <div>Likes</div>
                            <div>{stats.liked_count}</div>
                        </div>
                        <div className={styles.line}></div>

                        <div className={styles.user_details}>
                            <div>Matches</div>
                            <div>{stats.matched_count}</div>
                        </div>
                        <div className={styles.line}></div>

                        <div className={styles.user_details}>
                            <div>Views</div>
                            <div>{stats.view_count}</div>
                        </div>
                        <div className={styles.line}></div>

                        <div className={styles.user_details}>
                            <div>Skips</div>
                            <div>{stats.skipped_count}</div>
                        </div>
                        <div className={styles.line}></div>
                    </div>
                </div>

                <div className={styles.bottom_section}>
                    <div className={styles.section_header}>Skills</div>
                    <div className={styles.skills_container}>
                        <div className={styles.skill_cont}>
                            {data.length > 0 ? (data.map((dat)=>(
                                <div key={dat.id} className={styles.box}>
                                    <div key={dat.id} className={styles.skill_name}> {dat.skill.name}</div>
                                </div>
                            ))):(
                                <div className={styles.error_message}>
                                    <div>user has no skills</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
            </div>):(<div className={styles.loading}>
                <div>
                    <SyncLoader color="#FCC860" />
                </div>
            </div>)}
        </div>
        </>
    )
}

export default StatsComp;