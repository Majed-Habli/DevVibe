import React from "react";

const CustomInput = ({label, name, value, width, height, color, handleChange, fontSize, fontWeight}) => {

    return(
        <div style={{display: 'flex', flexDirection: 'column', rowGap: '5px'}}>
            <label style={{fontSize, fontWeight}} htmlFor={label}>
                {label}
            </label>
            <input
                id={label}
                onChange={handleChange}
                name={name}
                style={{width, height, padding: '1rem', backgroundColor: '#ffffff', border: '1px solid #9F8484', borderRadius: 4, color}}
                type="text"
                value={value}/>
        </div>
    )
}

export default CustomInput;