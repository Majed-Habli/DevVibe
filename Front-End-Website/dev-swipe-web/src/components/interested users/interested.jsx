import React, { useEffect, useState } from "react";
import styles from './interested.module.css'
import CustomButton from "../custom button/custombutton";
import Card from "../user card/card";
import PopUpCard from "../popup card/popupcard";
import ViewAllPopUp from "../models/view users/viewall";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";

const InterestedTable = () => {
    const [showModel, setShowModel] = useState(false);
    const  [errorDisplay,setErrorDisplay] =useState('');
    const [users, setUsers] = useState([]);
    const [error,setError] = useState('');

    const veiwAll = async () =>{
        setShowModel(true);
    }

    const getInterestes = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: "/user/developer/view_interested",
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status === 'success'){

                    const obj = data.data;
                    setUsers(obj);
                }else{
                    setErrorDisplay("no one has shown interest yet");
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    useEffect(()=>{
        getInterestes();
    },[]);


    return(
        <div className={styles.table_container}>
            <div className={styles.table_header}>
                <div>People interested in me</div>
                <CustomButton title={'view all'} onClick={veiwAll}/>
            </div>
            <div className={styles.table_body}>
                {!errorDisplay ?(<Card data={users} button={true}/>):(
                    <div className={styles.error_message}>{errorDisplay}</div>
                )}
            </div>
            {showModel && (
                <div className={styles.popup_background}>
                    <ViewAllPopUp isOpen={setShowModel} users={users}/>
                </div>
            )}
        </div>
    )
}

export default InterestedTable;