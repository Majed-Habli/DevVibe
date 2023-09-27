import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, ScrollView, Pressable, TextInput} from 'react-native';
import axios from 'react-native-axios';
import CustomInput from '../../components/custom input/customInput';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const EditForm = ({isOpen}) => {
    const [description, setDescription] = useState('');
    const [search, setSearch] = useState('');

    const handleSearchChange = (text) => {
        setSearch(text)
    };

    const hideModel = () =>{
        isOpen(prev => !prev);
    }

    const handleTextChange = (text) => {
        setDescription(text)
    };

    return(
        <View style={styles.container}>
            <View style={styles.form_container}>
                <View style={styles.container_header}>
                    <Text style={styles.txt}>Edit details</Text>
                    <Pressable style={styles.image_container} onPress={()=>hideModel()}>
                        <Image style={styles.icons} source={require("../../assets/Close.png")}/>
                    </Pressable>
                </View>
                <ScrollView style={styles.scroll_view}>
                    <View style={styles.text_area}>
                        <Text style={styles.input_header}>Gender</Text>
                        <TextInput style={styles.input} placeholder='hey' onChangeText={handleTextChange} defaultValue='female'></TextInput>
                    </View>
                    <View style={styles.text_area}>
                        <Text style={styles.input_header}>Description</Text>
                        <TextInput style={styles.input} placeholder='hey' onChangeText={handleTextChange} defaultValue='hey' multiline={true} numberOfLines={4}></TextInput>
                    </View>
                    <View>
                        <Text style={styles.input_header}>Skills</Text>

                    <View style={styles.searchbar_container}>
                        <View style={styles.searchbar}>
                            <Image
                                style={styles.search_icon}
                                source={require('../../assets/Search.png')}
                            />
                            <TextInput style={styles.searcbar_input} placeholder='search here' onChangeText={handleSearchChange} defaultValue={search}/>
                        </View>
                    </View>

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 2
    },
    form_container: {
        width: windowWidth/1.2,
        height: windowHeight/1.3,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'flex-start',
    },
    container_header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    image_container: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 17
    },
    icons: {
        width: 25,
        height: 25
    },
    scroll_view: {
        flex: 1,
        padding: 10,
    },
    text_area: {
        width: '100%',
        rowGap: 12,
        marginBottom: 10
    },
    input_header: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    input: {
        width: 250,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#9F8484',
        paddingLeft: 12
    },
    searchbar_container: {
        width: 250,
        height: 70,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    searchbar: {
        width: 250,
        height: 42,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#9F8484',
        alignItems: 'center',
        flexDirection: 'row'
    },
    search_icon: {
        width: 32,
        height: 23,
        objectFit: 'contain'
    },
    searcbar_input: {
        height: '100%',
        width: 250,
        paddingLeft: 10,
    },
});


export default EditForm;