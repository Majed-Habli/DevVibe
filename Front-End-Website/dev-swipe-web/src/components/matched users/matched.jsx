import React, { useEffect, useState } from "react";
import styles from './matched.module.css';
import CardCarouselComp from "../carousel/card/card";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";
import SyncLoader from "react-spinners/ClipLoader";

const MatchedTable = () =>{
    const [users, setUsers] = useState([]);
    const [error,setError] = useState('');

    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(users.length <= 0){
            setLoading(true)
        }else{
            setLoading(false)
        }
    },[users])

    const getMatched = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "/user/developer/view_matches",
                    method: requestMethods.GET,
                });
                const data = response;
                console.log(data)
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data;
                    setUsers(obj);
                    console.log(obj)

                }else{
                    setError("no matches yet!");
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    useEffect(()=>{
        getMatched();
    },[]);

    console.log(users)
    return(
        <div className={styles.matched_container}>
            <div className={styles.table_header}>Matched with</div>
            <div className={styles.table_body}>
                {!loading ? (<div className={styles.inner_table_container}>
                    {!error?
                        <CardCarouselComp information={users} issue={error}/>
                        :(<div className={styles.error_message}>{error}</div>)
                    }
                </div>):(
                    <div className={styles.inner_table_container}>
                        <SyncLoader color="#FCC860" />
                    </div>

                )}
            </div>
        </div>
    )
}

export default MatchedTable;