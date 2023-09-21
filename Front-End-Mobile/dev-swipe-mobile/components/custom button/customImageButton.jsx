import React from "react";
import { Text, View, Image} from 'react-native';

const CustomImageButton = ({image_name, width, height, backgroundColor, borderRadius, display, alignItems, justifyContent, onClick ,image_width, image_height, text, columnGap, padding, boxShadow, flexDirection, margin, cursor}) => {

    const image_url = `/${image_name}`;
    const txt = text;

    return(
        <View style={{width, height, backgroundColor, borderRadius, 
        cursor, display, alignItems, justifyContent, columnGap, padding, boxShadow, flexDirection, margin}}
        onClick={onClick}>
            <Image style={{width: image_width,height: image_height}} source={require('../../assets/Notify-button.png')} />
            {txt &&(
                <Text>{text}</Text>
            )}
        </View>
    )
}

export default CustomImageButton;