import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Dimensions, TextInput, ScrollView} from 'react-native';
import CustomInput from '../../components/custom input/customInput';
import CustomButton from '../../components/custom button/customButton';
import MatchedCard from '../../components/userCard/matchedCard';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Matches = () => {
    const onChange = (e) => {
        console.log('hey')
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll_view} automaticallyAdjustContentInsets={true} showsVerticalScrollIndicator={false}>

                <View style={styles.searchbar_container}>
                    <View style={styles.searchbar}>
                        <Image
                            style={styles.search_icon}
                            source={require('../../assets/Search.png')}
                        />
                        <TextInput name="{name} "style={styles.searcbar_input} placeholder='{placeholder}' onChange={onChange} defaultValue={"hey there"} />
                    </View>
                </View>
                <View style={styles.page_body}>
                    <View style={styles.header_container}>
                        <Text style={styles.header}>Matches</Text>
                    </View>
                    <View style={styles.cards_container}>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                            <MatchedCard/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
} 

export default Matches;

const styles = StyleSheet.create({
    container: {
    width: windowWidth,
    // height: windowHeight,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    },
    searchbar_container: {
        width: '100%',
        height: 100,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchbar: {
        width: '100%',
        height: 42,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'black',
        alignItems: 'center',
        flexDirection: 'row'
    },
    search_icon: {
        width: 43,
        height: 23,
        objectFit: 'contain'
    },
    searcbar_input: {
        height: '100%',
        width: 255,
        paddingLeft: 20,
    },
    page_body: {
        width: '100%',
        height: windowHeight,
    },
    header_container: {
        width: '100%',
        height: 53,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    header: {
        fontSize: 20,
    },
    cards_container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scroll_view: {
        flex: 1,
    }
    });