import React, {useState, useEffect} from "react";
import styles from '../../styles/users.module.css';
import UserCard from "../../components/user card/userCard";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";

const NewRecruites = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [recruites,setNewRecruites] = useState([]);

    const inputChange = (event) => {
        setSearch(event.target.value);
    };

    const getNewRecruiters = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: '/user/admin/new_recruiters',
                    method: requestMethods.GET,
                });
                const data = response;
                console.log('data.data',data.data)
                const token = " ";
    
                if(data.status == 'success'){
                    setNewRecruites(data.data);

                }else{
                    setError("failed to get data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Api returned with a fail:", error);
          }
    }
    console.log('infooooo',recruites)
    
    useEffect(()=>{
        getNewRecruiters();
    },[]);

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>New Recruites</span>
            </div>
            <div className={styles.searchable}>
                <div className={styles.top_bar}>
                    <input type="text" placeholder="Search users here..." value={search} onChange={inputChange}/>
                </div>
                <div className={styles.users_container}>
                    {Object.values(recruites).map((rec)=>(
                        <UserCard key={rec.id} data={rec}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewRecruites;