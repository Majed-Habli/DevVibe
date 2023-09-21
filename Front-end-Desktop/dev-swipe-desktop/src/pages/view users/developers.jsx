import React, {useState, useEffect} from "react";
import styles from '../../styles/users.module.css';
import UserCard from "../../components/user card/userCard";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";

const Developers = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [developers,setOldDevelopers] = useState([]);

    const inputChange = (event) => {
        setSearch(event.target.value);
    };

    const getOldDevelopers = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/admin/old_developers/${search}`,
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    setOldDevelopers(data.data);

                }else{
                    setError("failed to get data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Api returned with a fail:", error);
          }
    }
    
    useEffect(()=>{
        getOldDevelopers();
    },[search]);

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>Developers</span>
            </div>
            <div className={styles.searchable}>
                <div className={styles.top_bar}>
                    <input type="text" placeholder="Search users here..." value={search} onChange={inputChange}/>
                </div>
                <div className={styles.users_container}>
                    {developers.map((dev)=>(
                        <UserCard key={dev.id} data={dev}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Developers;