import React, { useEffect, useRef, useState } from "react";
import styles from '../../styles/profile.module.css';
import HeaderComp from "../../components/header component/headercard";
import CustomImageButton from "../../components/custom button/customImageButton";
import CarouselComp from "../../components/carousel/carousel";
import { sendRequest } from "../../utils/functions/axios";
import { requestMethods } from "../../utils/functions/requestMethods.";
import { localStorageAction } from "../../utils/functions/localStorage";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/custom button/custombutton";
import ViewSkills from "../../components/model/skillModel/viewSkills";
import EditForm from "../../components/edit form/editform";
import StatsComp from "../../components/Stats component/statscomp";
import UserDetails from "../../components/userDetailsComponent/userdetails";
import SyncLoader from "react-spinners/ClipLoader";

const Profile = () =>{
    const [errorSkills, setErrorSkills] = useState('');
    const [errorImages, setErrorImages] = useState('');
    
    const [skills, setSkills] = useState([]);
    const [stats, setStats] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSkillModel, setShowSkillModel] = useState(false);
    const [showInfoModel, setShowInfoModel] = useState(false);
    const params = useParams();

    const getSkills = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/view_user_skills/${params.id}`,
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    if(data.data == ''){
                        setErrorSkills(`${user.user_name}, has no skills yet.`)
                        console.log(error)
                    }

                    const obj = data.data;
                    setSkills(obj);
                }else{
                    setError("something went wrong");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Fetching skills failed:", error);
          }
    }

    const getUser = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/profile/${params.id}`,
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    const obj = data.data[0];
                    setUser(obj);

                }else{
                    setError("failed to get user data!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("Api return with a fail:", error);
          }
    }

    const getImages = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: `/user/developer/retrieve_user_images/${params.id}`,
                    method: requestMethods.GET,
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    if(data.data == ''){
                        setErrorImages(`${user.user_name}, has no pics yet.`)
                        console.log(error)
                    }
                    const obj = data.data;
                    setImages(obj);

                }else{
                    setError("something went wrong!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    const getStats = async () =>{
        const token = localStorageAction("token");

        try {
            if(!token){
                setError('there is nothing to show here');
                console.log(error);
            }else{

                const response = await sendRequest({
                    route: '/user/admin/stats',
                    method: requestMethods.POST,
                    body:{user_id: params.id}
                });
                const data = response;
                const token = " ";
    
                if(data.status == 'success'){
                    setStats(data);
                }else{
                    setError("something went wrong!");
                    console.log(error);
                }
            }
            
          } catch (error) {
            console.error("failed to get user:", error);
          }
    }

    useEffect(()=>{
        getUser();
        getSkills();
        getImages();
    },[params.id]);

    useEffect(()=>{
        setStats({liked_count: stats && stats.liked_count ? stats.liked_count: '0',matched_count: stats && stats.matched_count ? stats.matched_count: '0',skipped_count: stats && stats.skipped_count ? stats.skipped_count: '0',view_count: stats && stats.view_count ? stats.view_count: '0'});
        getStats();
    },[]);

    useEffect(()=>{
        if(!user){
            setLoading(true)
        }else{
            setLoading(false)
        }
    },[user])

    return(
        <div className={styles.page_container}>
            <div className={styles.page_header}>
                <span>Profile</span>
            </div>
            {!loading ? (<div className={styles.page_body}>
                <div className={styles.body_left}>
                    <div className={styles.body_top}>
                        <HeaderComp data={user} stats={stats}/>
                    </div>
                </div>
                <div className={styles.body_left}>
                    <div className={styles.body_top}>
                        <StatsComp data={skills} stats={stats}/>
                    </div>
                </div>
                <div className={styles.body_right}>
                    <UserDetails data={user} images={images} issue={setErrorImages}/>
                </div>
            </div>):(<div className={styles.loading}>
                <div>
                    <SyncLoader color="#FCC860" />
                </div>
            </div>)}
            {showSkillModel && (
                <div className={styles.popup_background}>
                    <ViewSkills isOpen={setShowSkillModel} skills={skills}/>
                </div>
            )}
            {showInfoModel && (
                <div className={styles.popup_background}>
                    <EditForm isOpen={setShowInfoModel} data={user}/>
                </div>
            )}
        </div>
    )
}

export default Profile;