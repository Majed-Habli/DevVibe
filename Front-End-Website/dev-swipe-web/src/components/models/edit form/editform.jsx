import React, { useState, useEffect } from "react";
import styles from "./editform.module.css";
import CustomImageButton from "../../custom button/customImageButton";
import CustomInput from "../../custom input/custominput";
import CustomButton from "../../custom button/custombutton";
import { localStorageAction } from "../../../utils/functions/localStorage";
import { sendRequest } from "../../../utils/functions/axios";
import { requestMethods } from "../../../utils/functions/requestMethods.";
import Select from "react-select";

const EditForm = ({ isOpen, data, user }) => {
  const userType = localStorageAction("user_type");
  const userId = localStorageAction("user_id");

  const [selectedGender, setSelectedGender] = useState(null);

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [userSkills, setUserSkills] = useState([]);
  const [selected, setSelected] = useState([]);
  const [unselectedSkills, setUnselectedSkills] = useState([]);


  const [skills, setSkills] = useState([]);

  const [inputs, setInputs] = useState({});

  const onChangeGenderHandel = (selectedOption) => {
    setSelectedGender(selectedOption);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  useEffect(() => {
    getUserSkills();
  }, []);

  useEffect(() => {
    getSkills();
  }, [search, userType]);

  useEffect(() => {
    const selectedSkills = skills.filter((skill) =>
      selected.includes(skill.id)
    );
    setUserSkills(selectedSkills);
  }, [selected, skills]);

  const inputChange = (event) => {
    setSearch(event.target.value);
  };

  const onChangeHandler = (id) => () => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
      setUnselectedSkills((prevIds) => [...prevIds, id]);
    } else {
      setSelected([...selected, id]);
    }
  };

  const hideModel = () => {
    isOpen((prev) => !prev);
  };

  const getSkills = async () => {
    const token = localStorageAction("token");

    try {
      if (!token) {
        setError("there is nothing to show here");
        console.log(error);
      } else {
        const response = await sendRequest({
          route: `/user/developer/view_all_skills/${search}`,
          method: requestMethods.GET,
        });
        const data = response;
        const token = " ";

        if (data.status == "success") {
          const obj = data.data;
          setSkills(obj);
        } else {
          setError("failed to get user data!");
          console.log(error);
        }
      }
    } catch (error) {
      console.error("failed to get user:", error);
    }
  };

  const getUserSkills = async () => {
    const token = localStorageAction("token");
    const userId = localStorageAction("user_id");

    try {
      if (!token) {
        setError("there is nothing to show here");
        console.log(error);
      } else {
        const response = await sendRequest({
          route: `/user/developer/view_user_skills/${userId}`,
          method: requestMethods.GET,
        });
        const data = response;
        const token = " ";

        if (data.status == "success") {
          const obj = data.data;
          setUserSkills(obj);
          const initialSelected = obj.map((userSkill) => userSkill.skill.id);
          setSelected(initialSelected);
        } else {
          setError("no skills exist!");
          console.log(error);
        }
      }
    } catch (error) {
      console.error("Fetching skills failed:", error);
    }
  };

  const addUserSkills = async () => {
    const mySkills = JSON.stringify(selected);

    try {
      if (!selected) {
        setError("no skills to add");
        console.log(error);
      } else {
        const response = await sendRequest({
          route: "/user/developer/add_skills",
          method: requestMethods.POST,
          body: { user_skills: mySkills },
        });
        const data = response;
        const token = " ";

        if (data.status == "success") {
          console.log("successfully added");
        } else {
          setError("failed to add!");
          console.log(error);
        }
      }
    } catch (error) {
      console.error("bad request. failed:", error);
    }
  };

  const removeUserSkills = async () => {
    const removeSkill =  JSON.stringify(unselectedSkills);

    try {
      const response = await sendRequest({
        route: "/user/developer/remove_skills",
        method: requestMethods.POST,
        body: { user_skills: removeSkill },
      });
      const data = response;
      const token = " ";

      if (data.status == "success") {
        setUserSkills((prevSkills) =>
        prevSkills.filter((row) => !unselectedSkills.includes(row.skill.id))
      );
      } else {
        setError("failed to remove!");
        console.log(error);
      }
    } catch (error) {
      console.error("bad request. failed:", error);
    }
  };

  const updateUserInfo = async () => {
    try {
      if (!inputs) {
        setError("nothing to change");
        console.log(error);
      } else {
        const response = await sendRequest({
          route: "user/developer/update-details",
          method: requestMethods.POST,
          body: {
            user_name: inputs.user_name,
            description: inputs.description,
            gender: inputs.gender,
            company_name: inputs.company_name,
            github_url: inputs.github_url,
            linkedin_url: inputs.linkedin_url,
          },
        });
        const data = response;
        const token = " ";

        if (data.status == "success") {
          hideModel();
        } else {
          setError("failed to update!");
          console.log(error);
        }
      }
    } catch (error) {
      console.error("bad request. failed:", error);
    }
  };

  const save = async () => {
    try {
      await updateUserInfo();
      await addUserSkills();
      await removeUserSkills();
      hideModel()
      window.location.href = `/dashboard/profile/${userId}`
    } catch (error) {
      console.log("failed to save", error);
    }
  };

    return(
        <div className={styles.popup_container}>
            <div className={styles.popup_header}>
                <div>Edit profile</div>
                <CustomImageButton image_name={"Close.png"} width={27} height={27} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={hideModel} cursor={'pointer'}/>
            </div>
            <div className={styles.popup_body}>
                <div className={styles.group_row}>
                    <CustomInput label={"Name"} name={'user_name'} placeholder={user.user_name} value={inputs.user_name} handleChange={handleChange} width={225} height={38}/>
                    {userType == 3  ?(<CustomInput label={"Company Name"} name={'company_name'} placeholder={data.rec_details.company_name} value={inputs.company_name} handleChange={handleChange} width={275} height={35}/>):(
                    <Select
                        value={selectedGender}
                        placeholder= 'Gender'
                        onChange={onChangeGenderHandel}
                        options={options}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                width: '225px',
                                height: '35px',
                                borderColor: '#9F8484'
                            }),
                            menu: (provided, state) => ({
                                ...provided,
                                width: '225px',
                                borderColor: state.isFocused ? 'black' : 'grey'
                            }),
                            }}
                    />
                    )}
                </div>
                {userType == 2 && (
                    <div className={styles.group_row}>
                    <CustomInput label={"Github"} name={'github_url'} value={inputs.github_url} placeholder={data.github_url} handleChange={handleChange} width={225} height={38}/>
                    <CustomInput label={"LinkedIn"} name={'linkedin_url'} value={inputs.linkedin_url} placeholder={data.linkedin_url} handleChange={handleChange} width={225} height={38}/>
                    </div>
                )}
                {userType == 3 ?(
                    <div>
                        <CustomInput label={"Company Name"} name={'company_name'} placeholder={data.company_name} value={inputs.company_name} handleChange={handleChange} width={275} height={35}/>
                        <CustomInput label={"Description"} name={'description'} placeholder={data.description} value={inputs.description} handleChange={handleChange} width={'100%'} textArea={true} height={135}/>
                    </div>
                    
                ):(
                    <div>
                        <CustomInput label={"Description"} name={'description'} placeholder={data.description} value={inputs.description} handleChange={handleChange} width={'100%'} textArea={true} height={135}/>
                    </div>
                )}
                
                <div className={styles.skill_container}>
                    <div className={styles.header}>Skills</div>
                </div>
                <div className={styles.searchable}>
                    <div className={styles.top_bar}>
                        <input type="text" placeholder="Search skills here..." value={search} onChange={inputChange}/>
                    </div>
                    <div className={styles.skill_display}>
                    {skills.map((skill)=>(
                        <div key={skill.id} className={styles.box}>
                            <input id={`${skill.id}`} type="checkbox" name={`${skill.name}`}checked={selected.includes(skill.id)}
                                onChange={onChangeHandler(skill.id)}/>
                            <label htmlFor={`${skill.id}`}> {skill.name}</label>
                        </div>
                    ))}
                    
                    </div>
                </div>
            </div>
            <div className={styles.button_container}>
                <CustomButton title={'save'} backgroundColor={'#E7B54F'} width={90} height={30} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={4} onClick={() => save()}/>
            </div>
        </div>
    )
}

export default EditForm;