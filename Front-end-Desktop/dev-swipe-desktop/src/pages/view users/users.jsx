import React, {useState, useEffect} from "react";
import styles from '../../styles/users.module.css';
import UserCard from "../../components/user card/userCard";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";

const Users = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [info,setInfo] = useState([]);
    // `/user/developer/view_all_skills/
    const inputChange = (event) => {
        setSearch(event.target.value);
    };
    
    const getNewDevelopers = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/admin/new_developers/${search}`,
                    method: requestMethods.GET,
                });
                const data = response;
                console.log(data)
                const token = " ";
    
                if(data.status == 'success'){
                    setInfo(data.data);
                    console.log(info)

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
        getNewDevelopers();
    },[search]);

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>New Developers</span>
            </div>
            <div className={styles.searchable}>
                <div className={styles.top_bar}>
                    <input type="text" placeholder="Search users here..." value={search} onChange={inputChange}/>
                </div>
                <div className={styles.users_container}>
                    {info.map((inf)=>(
                        <UserCard key={inf.id} data={inf} url={'/dashboard/users/new-developers'}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Users;