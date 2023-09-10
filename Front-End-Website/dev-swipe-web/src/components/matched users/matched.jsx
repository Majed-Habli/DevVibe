import React from "react";
import styles from './matched.module.css';
import CustomButton from "../custom button/custombutton";

const MatchedTable = () =>{

    return(
        <div className={styles.matched_container}>
            <div className={styles.table_header}>Matched with</div>
            <div className={styles.table_body}>
                <table>
                    <tr>
                        <th></th>
                        <th>Developer</th>
                        <th>Skills</th>
                        <th>Profile</th>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>majed</td>
                        <td>
                            <CustomButton width={45} height={45} backgroundColor={'yellow'}/>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default MatchedTable;