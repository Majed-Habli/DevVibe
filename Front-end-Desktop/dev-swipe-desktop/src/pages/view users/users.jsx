import React from "react";
import styles from '../../styles/users.module.css';

const Users = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const inputChange = (event) => {
        setSearch(event.target.value);
    };

    return(
        <div className={styles.container}>
            <div className={styles.page_header}>
                <span>New Developers</span>
            </div>
            <div className={styles.searchable}>
                <div className={styles.top_bar}>
                    <input type="text" placeholder="Search users here..." value={search} onChange={inputChange}/>
                </div>
            </div>
        </div>
    )
}

export default Users;