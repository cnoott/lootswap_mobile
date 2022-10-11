import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Pressable, Alert, Image, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUserContext } from '../../shared/UserContext';
import brands from './brands';
import Sizing from './Sizing';
import CurrencyInput from 'react-native-currency-input';
import { PlusIcon } from 'react-native-heroicons/solid';
import * as ImagePicker from 'expo-image-picker';
import { getSignedRequest, uploadFile } from '../../api/image_upload';
import RadioButtonRN from 'radio-buttons-react-native';
import Error from '../../shared/Error';
import { createProduct } from '../../api/apiProduct';
import SuccessModal from '../../shared/SuccessModal';


// TODO:
//  - paypal integration ( prevent add loot if not paypal onboarded)
//  - should header bar be shown?
//  - make sure keyboard never gets in way 
//  - camera / library permissions
//  - error state
//  - reset state on submit ( it keeps state on screen change)
//  - input validation
const AddLoot = ({ navigation }) => {
    const { user: { _id }, token } = useUserContext();
    const scrollRef = useRef();


    const [values, setValues] = useState({
        name: '',
        userId: _id,
        description: '',
        condition: '',
        size: '',
        brand: '',
        interestedIn: '',
        price: '',
        who_pays:'',
        sellerShippingCost: '10',
        category: '',
        type: '',
        primary_photo: '',
        secondary_photos: [],
        loading: false,
        error: '',
        success: false,
    });
    const {name, description, condition, size, brand, interestedIn, price,
        who_pays, sellerShippingCost, category, primary_photo, secondary_photos,  
        loading, success, error, type
    } = values;

    const [successOpen, setSuccessOpen] = useState(false);
    const [productId, setProductId] = useState(''); //used with success modal

    const [openCategory, setOpenCategory] = useState(false); //might combine these dropdown condtions into one state
    const categories = [
        {label: 'Shoes', value: 'shoes'},
        {label: 'Shirts', value: 'shirts'},
        {label: 'Jackets', value: 'jackets'},
        {label: 'Pants', value: 'pants'},
        {label: 'Shorts', value: 'shorts'},
        {label: 'Hats', value: 'hats'}
    ];

    const [openBrands, setOpenBrands] = useState(false);

    const [openCondition, setOpenCondition] = useState(false);
    const conditions = [
        {label: 'New with box', value: 'New with box'},
        {label: 'New without box', value: 'New without box'},
        {label: 'New with defects', value: 'New with defects'},
        {label: 'Pre-owned', value: 'Pre-owned'}
    ];
    const handleConditionChange = inputCondition => setValues({...values, 'condition': inputCondition.value});

    const tradeOptionsData = [
        {label: 'Trade and Sell', value: 'trade-sell'},
        {label: 'Trade Only', value: 'trade-only'},
        {label: 'Sell Only', value: 'sell-only'}
    ];
    const handleTradeOptionsChange = inputTradeOption => setValues({...values, 'type': inputTradeOption.value});

    const shippingOptionsData = [
        {label: 'Buyer will pay', value: 'buyer-pays'},
        {label: 'I will pay \n(Pay shipping costs based on buyers location)', value: 'seller-pays'}
    ];
    const handleShippingOptionsChange = inputWhoPays => setValues({...values, 'who_pays': inputWhoPays.value});

    const handleChange = name => value => setValues({...values, [name]: value})

    const handleCategoryChange = inputCategory => setValues({...values, 'category': inputCategory.value});

    const handleBrandChange = inputBrand => setValues({...values, 'brand': inputBrand.value});

    const [primaryLoading, setPrimaryLoading] = useState(false);
    const [secondaryLoading, setSecondaryLoading] = useState(false);

   
    const scrollTop = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true
        });
    };

    const primaryImagePickerCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        setPrimaryLoading(true);

        if ( permissionResult.granted === false) {
            //ERrro here
            return;
        }

        let  result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [5, 6],
            quality: 1,
        });

        if (result.canceled) {
            setLoading(false);
        }
        else {
            getSignedRequest(result).then(response => {
                if (response.error) {
                    //error handling here
                    console.log(res.error);
                    setPrimaryLoading(false);

                }
                else {
                    uploadFile(result, response.signedRequest, response.url).then(imgUrl => {
                        setValues({...values, 'primary_photo': imgUrl});
                        setPrimaryLoading(false);
                    });
                }
            });
        }
    };

    const primaryImagePickerLibrary = async () => {
        setPrimaryLoading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5,6],
            quality: 1,
        });

        if (result.canceled) {
            setLoading(false);
        }
        else {
            getSignedRequest(result).then(response => {
                if (response.error) {
                    //error handling here
                    console.log(res.error);
                    //set loading here
                    setPrimaryLoading(false);
                }
                else {
                    uploadFile(result, response.signedRequest, response.url).then(imgUrl => {
                        setValues({...values, 'primary_photo': imgUrl});
                        setPrimaryLoading(false);
                    });
                }
            });
        }
    };

    const primaryShowChooseMediaAlert = () => 
        Alert.alert(
            'How would you like to select image?',
            '',
            [
                {
                    text: 'Use Camera',
                    onPress: () => primaryImagePickerCamera()
                },
                {
                    text: 'Choose From Library',
                    onPress: () => primaryImagePickerLibrary()
                }

            ],
            { cancelable: true }
        );

    const secondaryImagePickerCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        setSecondaryLoading(true);

        if ( permissionResult.granted === false) {
            return;
        }

        let  result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [5, 6],
            quality: 1,
        });

        if (result.canceled) {
            setLoading(false);
        }
        else {
            console.log(result);
            getSignedRequest(result).then(response => {
                if (response.error) {
                    //error handling here
                    console.log(res.error);
                    setSecondaryLoading(false);
                }
                else {
                    uploadFile(result, response.signedRequest, response.url).then(imgUrl => {
                        let newArray= [...secondary_photos];
                        newArray.push(imgUrl);
                        setValues({...values, 'secondary_photos': newArray});

                        setSecondaryLoading(false);
                    });
                }
            });
        }

    };

    const secondaryImagePickerLibrary = async () => {
        setSecondaryLoading(true);

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5,6],
            quality: 1,
        });

        if (result.canceled) {
            setSecondaryLoading(false);
        }
        else {
            getSignedRequest(result).then(response => {
                if (response.error) {
                    //error handling here
                    console.log(res.error);
                    //set loading here
                    setSecondaryLoading(false);
                }
                else {
                    uploadFile(result, response.signedRequest, response.url).then(imgUrl => {
                        let newArray = [...secondary_photos];
                        newArray.push(imgUrl);
                        setValues({...values, 'secondary_photos': newArray});

                        setSecondaryLoading(false);
                    });
                }
            }); 
        }
    };
    const secondaryShowChooseMediaAlert = () => 
        Alert.alert(
            'How would you like to select image?',
            '',
            [
                {
                    text: 'Use Camera',
                    onPress: () => secondaryImagePickerCamera()
                },
                {
                    text: 'Choose From Library',
                    onPress: () => secondaryImagePickerLibrary()
                }

            ],
            { cancelable: true }
        );

    const removePhoto = (index) => {
        if (secondary_photos.length === 1) {
            setValues({...values, 'secondary_photos': []});
        }
        else {
            let newArray = secondary_photos.splice(index, 1);
            setValues({...values, 'secondary_photos': newArray});
        }
    };

    const clickSubmit = async () => {
        if (primaryLoading || secondaryLoading) {
                setValues({...values, error: 'A photo is still uploading, please wait' , loading: false});
        }
        else {
            await setValues({...values, error: '', loading: true });
            createProduct(_id, token, values).then(res => {
                if (res.error) {
                    scrollTop();
                    setValues({...values, error: res.error, loading: false});
                }
                else {
                    setProductId(res.result._id);
                    setSuccessOpen(true);
                    setValues({name: '', userId: '', description: '', condition: '', size: '', brand: '', interestedIn: '', price: '', who_pays:'', sellerShippingCost: '10', category: '', type: '', primary_photo: '', secondary_photos: [], loading: false, error: '', success: false});

                }
            });
        }
    };


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
                    <Text style={styles.title}> Add Loot </Text>

                    <View style={{ marginHorizontal: '5%', marginBottom: 8, alignItems: 'center'}}>{ error && <Error errorText={error}/>}</View>

                    <SuccessModal
                        setOpen={setSuccessOpen}
                        open={successOpen}
                        title='Success!'
                        desc={'Your item has been listed on the market'}
                        buttonText={'View Item'}
                        navigateTo={ () => { 
                            setSuccessOpen(false);
                            navigation.navigate('ProductPage', { productId })
                        }}
                    />

                    <View style={{...styles.inputs, zIndex: 5000}}>
                        <Text style={styles.inputTitle}> Category </Text>
                        <DropDownPicker
                            open={openCategory}
                            value={category}
                            items={categories}
                            setOpen={setOpenCategory}
                            listMode="SCROLLVIEW"
                            onSelectItem={value => handleCategoryChange(value)}

                        />
                    </View>

                    <View style={{...styles.inputs, zIndex: 4000}}>
                        <Text style={styles.inputTitle}> Item Name </Text>
                        <TextInput
                            style={styles.inputBox}
                            value={name}
                            onChangeText={handleChange('name')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            spellCheck={false}
                            autoCompleteType='off'
                        />
                    </View>

                    <View style={{...styles.inputs, zIndex: 3000}}>
                        <Text style={styles.inputTitle}> Brand Name </Text>
                        <DropDownPicker
                            searchable={true}
                            open={openBrands}
                            value={brand}
                            items={brands}
                            setOpen={setOpenBrands}
                            listMode="SCROLLVIEW"
                            onSelectItem={value => handleBrandChange(value)}
                        />
                    </View>


                    <View style={{...styles.inputs, zIndex: 2000}}>
                        <Text style={styles.inputTitle}> Size</Text>
                        <Sizing 
                            setValues={setValues} 
                            values={values}
                            size={size}
                            category={category}
                        />
                    </View>

                    <View style={{...styles.inputs, zIndex: 1000}}>
                        <Text style={styles.inputTitle}> Condition </Text>
                        <DropDownPicker
                            open={openCondition}
                            value={condition}
                            items={conditions}
                            setOpen={setOpenCondition}
                            listMode="SCROLLVIEW"
                            onSelectItem={value => handleConditionChange(value)}
                        />
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.inputTitle}> Description </Text>
                        <TextInput
                            multiline
                            style={styles.multiline}
                            onChangeText={handleChange('description')}
                            value={description}
                            autoCorrect={true}
                            spellCheck={true}
                            autoCompleteType='on'
                        />
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.inputTitle}> Price </Text>
                        <CurrencyInput
                            style={styles.inputBox}
                            value={price}
                            onChangeValue={handleChange('price')}
                            prefix='$'
                            minValue={0}
                            delimiter=','
                            separator='.'
                            precision={2}
                        />
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.inputTitle}> Primary Photo </Text>


                        { primaryLoading  
                            ? (
                                
                                <Text style={{ color: 'blue' }}> Loading... </Text>

                            ) : (
                                <View>
                                    { primary_photo === ''
                                        ? (
                                <Pressable 
                                    style={styles.primaryPhotoDotted}
                                    onPress={primaryShowChooseMediaAlert}
                                >
                                    <PlusIcon size={30} color='blue'/>
                                </Pressable>

                                        ) : (
                                            <View>
                                                <View style={styles.primaryPhotoContainer}>
                                                    <Image
                                                        source={{ uri: primary_photo }}
                                                        style={{ width: 80, height: 100, marginTop: 5 }}
                                                    />
                                                </View>
                                                <Text 
                                                    style={{marginTop: 3, color: 'blue'}}
                                                    onPress={primaryShowChooseMediaAlert}
                                                > 
                                                    Choose Again 
                                                </Text>
                                            </View>
                                        )}
                                </View>
                            )
                        }

                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.inputTitle}> Secondary Photos </Text>
                        {secondaryLoading  && <Text style={{ color: 'blue' }}> Loading Image... </Text>}
                        { secondary_photos.length === 0 
                            ? (
                                <View>
                                    { !secondaryLoading  && (
                                        <Pressable 
                                            style={styles.primaryPhotoDotted}
                                            onPress={secondaryShowChooseMediaAlert}
                                        >
                                            <PlusIcon size={30} color='blue'/>
                                        </Pressable>
                                    )}
                                </View>
                            ) : (
                                <View style={styles.secondaryPhotosContainer}>
                                    { secondary_photos.map((photo, i) => (
                                        <View style={styles.secondaryPhotoContainer} key={i}>
                                            <Image
                                                source={{ uri: photo }}
                                                style={{ 
                                                    width: 80, 
                                                    height: 100, 
                                                    marginTop: 5, 
                                                    marginLeft: 8, 
                                                }}
                                            />
                                            <Text 
                                                style={{ color: 'red', marginLeft: 5 }} 
                                                onPress={() => removePhoto(i)}
                                            >
                                                Remove
                                            </Text>
                                        </View>
                                    ))}
                                    <View style={{ ...styles.primaryPhotoDotted, marginLeft: 8 }}>
                                        { !secondaryLoading && (
                                            <Pressable 
                                                onPress={secondaryShowChooseMediaAlert}
                                            >
                                                <PlusIcon size={30} color='blue'/>
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                            )
                        }
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.inputTitle}> (Optional) Are there any particular items you wish to trade this item for? </Text>
                        <TextInput
                            multiline
                            style={styles.multiline}
                            onChangeText={handleChange('interestedIn')}
                            value={interestedIn}
                            autoCorrect={true}
                            spellCheck={true}
                            autoCompleteType='on'
                        />
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.inputTitle}> Trade Options</Text>
                        <RadioButtonRN
                            data={tradeOptionsData}
                            selectedBtn={selected => handleTradeOptionsChange(selected)}
                            box={false}
                            activeColor='blue'
                        />
                    </View>

                    <View style={styles.inputs}>
                        <Text style={styles.inputTitle}> Who Pays for Shipping?</Text>
                        <RadioButtonRN
                            data={shippingOptionsData}
                            selectedBtn={selected => handleShippingOptionsChange(selected)}
                            box={false}
                            activeColor='blue'
                        />
                    </View>
                    { who_pays === 'buyer-pays' && (
                        <View style={styles.inputs}>
                        <Text style={styles.inputTitle}> Shipping Cost </Text>
                        <CurrencyInput
                            style={styles.inputBox}
                            value={sellerShippingCost}
                            onChangeValue={handleChange('sellerShippingCost')}
                            prefix='$'
                            minValue={0}
                            delimiter=','
                            separator='.'
                            precision={2}
                        />
                    </View>
                    )}
                    <View style={{...styles.inputs, marginTop: 15}}>
                        <Pressable style={styles.submitButton} onPress={clickSubmit}>
                            <Text style={{ color: 'white', fontSize: 20 }}>
                                Add Loot
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        marginHorizontal: '10%',
        fontFamily: 'Inter-Bold',
        fontSize: 30,
        marginTop: '15%',
        marginBottom: 20,
        color: '#6267fe'
    },
    inputs: {
        marginHorizontal: '10%',
        marginBottom: 20,
    },
    inputTitle: {
        fontWeight: 'bold',
    },
    inputBox: {
        borderWidth: 1,
        borderRadius: 8,
        height: 50,
        padding: 10,
        backgroundColor: 'white',
    },
    multiline: {
        borderWidth: 1,
        borderRadius: 8,
        height: 80,
        padding: 5,
        backgroundColor: 'white'
    },
    primaryPhotoDotted: {
        marginTop: 5,
        width: '20%',
        height: 66,
        borderRadius: 15,
        borderColor: 'blue',
        borderStyle: 'dashed',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    primaryPhotoContainer: {
        flex: 1,
        borderRadius: 8,
        width: 80, height: 110,
        overflow: 'hidden'
    },

    primaryPhoto: {
        width: 50,
        borderRadius: 8,
    },
    secondaryPhotosContainer: {
        flex: 1,
        flexDirection: 'row', 
        flexWrap: 'wrap',
    },
    secondaryPhotoContainer: {
        borderRadius: 8,
        width: 80, height: 120,
        overflow:'hidden',
    },
    submitButton: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 90,
        backgroundColor: '#6267fe',
        borderRadius: 8,
    },
});

export default AddLoot;
