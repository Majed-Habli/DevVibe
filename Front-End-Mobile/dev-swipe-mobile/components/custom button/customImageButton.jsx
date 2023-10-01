import React from "react";
import { Text, View, Image} from 'react-native';

const CustomImageButton = ({image_name, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, onClick ,image_width, image_height, text, columnGap, padding, boxShadow, flexDirection, margin, cursor}) => {

    const image_url = `${image_name}`;
    console.log(image_url)
    const txt = text;

    return(
        <View style={{width, height, backgroundColor, borderRadius, 
        cursor, display, alignItems, justifyContent, columnGap, padding, boxShadow, flexDirection, margin}}
        onClick={onClick}>
            {txt &&(
                <Text>{text}</Text>
            )}
        </View>
    )
}

export default CustomImageButton;