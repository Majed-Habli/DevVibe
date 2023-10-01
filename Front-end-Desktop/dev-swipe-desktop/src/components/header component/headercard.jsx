import React, { useEffect, useState } from "react";
import styles from '../../styles/headercard.module.css';
import CustomButton from "../custom button/custombutton";
import CustomImageButton from "../custom button/customImageButton";
import { localStorageAction } from "../../utils/functions/localStorage";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { sendRequest } from "../../utils/functions/axios";
import SyncLoader from "react-spinners/ClipLoader";

const HeaderComp = ({data, stats}) =>{
    const [blocked, setBlocked] =useState(false)

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const userID = data.id;
    // const userId = localStorageAction("user_id")

    const BlockPerson = async () =>{

        try {
            const response = await sendRequest({
                route: "/user/admin/deny_access",
                method: requestMethods.POST,
                body:{user_id: userID,
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                setBlocked(true);
            }else{
                setBlocked(false);
            }
            
          } catch (error) {
            console.error("failed to call the api:", error);
          }
    }

    const isBlocked = async () =>{

        try {
            const response = await sendRequest({
                route: "/user/admin/is_blocked",
                method: requestMethods.POST,
                body:{id: userID,
                    }
            });
            const data = response;
            const token = " ";

            if(data.status == 'success'){
                setBlocked(true);
            }else{
                setBlocked(false);
            }
            
          } catch (error) {
            console.error("failed to call the api:", error);
          }
    }

    const goTo = (url) =>{
        if(!url == ''){
            window.location.href = url
        }
    }

    useEffect(()=>{
        if(data.user_type_id == 3){
            setUser({github_url : data.rec_details && data.rec_details.github_url ?data.rec_details.github_url : "",linkedin_url : data.rec_details && data.rec_details.linkedin_url ?data.rec_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }else{
            setUser({github_url : data.dev_details && data.dev_details.github_url ?data.dev_details.github_url : "",linkedin_url : data.dev_details && data.dev_details.linkedin_url ?data.dev_details.linkedin_url : "",profile_image_url: data.profile_image_url
        })
        }

        isBlocked()
    },[data,blocked]);

    // useEffect(()=>{
    //     if(`${data.id}` === userId){
    //         setShowButtons(true);
    //     }else{
    //         setShowButtons(false);
    //     }
    // },[data])

    return(
        // <div className={styles.container}>
            
        //     <div className={styles.header_section}>
        //         <div className={styles.header}>
        //             {user.profile_image_url ? (<img src={`${data.profile_image_url}`} alt="profile-image" />) : (
        //                 <div>
        //                     <img src="/default-user.png" alt="profile-image" />
        //                 </div>
        //             )}
        //             <div className={styles.profile_username}>{data.user_name}</div>
        //             {data.user_type_id == 2 ? (<div className={styles.profile_role}>Developer</div>):(
        //                 <div className={styles.profile_role}>Recruiter</div>
        //             )}
        //         </div>

        //         <div className={styles.socials}>
        //                 {/* {data.rec_details ?(
        //                     <div className={styles.description}>{data.rec_details.description}</div>
        //                 ):(
        //                     <div className={styles.description}>"Writing something catchy can help get you noticed"</div>
        //                 )} */}

        //             {user && data.user_type_id == 2 && (
        //                 <div className={styles.flex}>
        //                     {user.resume && (
        //                         <CustomImageButton image_name={'Uploadfile.png'} image_width={25} image_height={25} onClick={() => goTo(user.linkedin_url)} cursor={'pointer'}/>
        //                     )}
        //                     {user.github_url && (
        //                         <CustomImageButton image_name={'Github.png'} image_width={25} image_height={25} onClick={() => goTo(user.github_url)} cursor={'pointer'}/>
        //                     )}
        //                 </div>
        //             )}
        //             {user.linkedin_url &&(
        //                 <CustomImageButton image_name={'Linkedin.png'} image_width={25} image_height={25} onClick={() => goTo(data.linkedin_url)} cursor={'pointer'}/>
        //             )}
        //         </div>
        //     </div>

        //     <div className={styles.body_section}>
        //         <div className={styles.user_details}>
        //             <div>Likes:</div>
        //             <div>{stats.liked_count}</div>
        //         </div>
        //         <div className={styles.user_details}>
        //             <div>Matches:</div>
        //             <div>{stats.matched_count}</div>
        //         </div>
        //         <div className={styles.user_details}>
        //             <div>Views:</div>
        //             <div>{stats.view_count}</div>
        //         </div>
        //         <div className={styles.user_details}>
        //             <div>Skips:</div>
        //             <div>{stats.skipped_count}</div>
        //         </div>
        //         {/* <div className={styles.user_details}>Email: {data.email}</div> */}
        //         {/* <div className={styles.user_details}>Lives at: {data.country}</div> */}
        //         <div className={styles.line}></div>
        //     </div>
        //     <div className={styles.button_container}>
        //         {blocked ? (
        //             <CustomButton title={'Un Block'} backgroundColor={'#DC3545'} color={'white'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} width={'100%'} height={'100%'} fontWeight={'bold'} onClick={()=>BlockPerson()}/>
        //         ):(
        //             <CustomButton title={'Block'} backgroundColor={'#DC3545'} color={'white'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} width={'100%'} height={'100%'} fontWeight={'bold'} onClick={()=>BlockPerson()}/>
        //         )}

                
        //     </div>
        // </div>
        <>
        <div className={styles.container}>
            {!loading ?(<div className={styles.container_body}>
                <div className={styles.image_container}>
                    {!data.profile_image_url ? (
                        <img src="/default-user.png" alt="user profile image" />
                    ):(
                        <img src={`${data.profile_image_url}`} alt="recipe img" />
                    )}
                </div>
                <div className={styles.details}>
                    <div className={styles.detail_group_one}>
                        <div className={styles.user_name}>{data.user_name}</div>
                        <div className={styles.user_email}>{data.email}</div>
                    </div>
                    {data.rec_details?.company_name && (
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Works at:</div>
                        <div className={styles.company_name}>{user.company_name} {data.country}</div>
                    </div>
                    )}
                    {data.country &&(
                    <div className={styles.company_details}>
                        <div className={styles.company_label}>Lives in:</div>
                        <div className={styles.company_name}>{data.country}</div>
                    </div>
                    )}
                </div>
                <div className={styles.socials_container}>
                {user && data.user_type_id == 2 && (
                    <div>
                        {user.github_url && (
                            <CustomImageButton width={36} height={36} image_name={'Github.png'} alignItems={'center'} display={'flex'} backgroundColor={'#E8E8E8'}borderRadius={10} justifyContent={'center'} image_width={26} image_height={26} onClick={() => goTo(user.github_url)} cursor={'pointer'}/>
                        )}
                    </div>
                        )}
                        {user.linkedin_url &&(
                            <CustomImageButton image_name={'Linkedin.png'} image_width={30} image_height={30} backgroundColor={'#E8E8E8'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={10} width={36} height={36} onClick={() => goTo(user.linkedin_url)} cursor={'pointer'}/>
                        )}
                </div>
                <div className={styles.button_container}>

                    {blocked ? (
                        <CustomImageButton text={'Block'} width={'100%'} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Add-icon.png"} image_height={16} image_width={16} backgroundColor={'#DC3545'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'} color={'white'} fontweight={600} onClick={()=>BlockPerson()} cursor={'pointer'}/>
                    ):(
                        <CustomImageButton text={'Block'} width={'100%'} height={34} display={'flex'} alignItems={'center'} columnGap={'1rem'} image_name={"Add-icon.png"} image_height={16} image_width={16} backgroundColor={'#DC3545'} padding={'0 .5rem'} borderRadius={4} boxShadow={'0 2px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.1)'} color={'white'} fontweight={600} onClick={()=>BlockPerson()} cursor={'pointer'}/>
                    )}
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

export default HeaderComp;