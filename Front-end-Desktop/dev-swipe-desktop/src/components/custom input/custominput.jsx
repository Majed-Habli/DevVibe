import React from "react";

const CustomInput = ({label, type, name, value, width, height, color, handleChange, fontSize, fontWeight, textArea, placeholder}) => {

    return(
        <div style={{display: 'flex', flexDirection: 'column', rowGap: '5px'}}>
            <label style={{fontSize, fontWeight}} htmlFor={label}>
                {label}
            </label>
            {!textArea ?(<input
                id={label}
                placeholder={placeholder}
                onChange={handleChange}
                name={name}
                style={{width, height, padding: '1rem', backgroundColor: '#ffffff', border: '1px solid #9F8484', borderRadius: 4, color}}
                type={type}
                defaultValue={value}/>):(
                    <textarea id={label} name={name} placeholder={placeholder} cols="30" rows="10" style={{width, height, padding: '1rem', backgroundColor: '#ffffff', border: '1px solid #9F8484', borderRadius: 4, color}} 
                    value={value} onChange={handleChange}/>
                )}
        </div>
    )
}

export default CustomInput;