import React from "react";

const CustomInput = ({label, name, value, width, height, color, handleChange, flexDirection, rowGap}) => {

    return(
        <div style={{display: 'flex', flexDirection: 'column', rowGap: '5px'}}>
            <label className="text-md font-medium" htmlFor={label}>
                {label}
            </label>
            <input
                id={label}
                onChange={handleChange}
                name={name}
                style={{width, height, padding: '1rem', backgroundColor: '#ffffff', border: '#9F8484', borderRadius: 4, color}}
                type="text"
                value={value}/>
        </div>
    )
}

export default CustomInput;