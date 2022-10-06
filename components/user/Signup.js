import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { getSignedRequest, uploadFile } from '../../api/image_upload';
import Error from '../../shared/Error';
import { signUp, authenticate } from '../../api/auth';
import { useUserUpdate } from '../../shared/UserContext';
import EmailValidator from 'email-validator';

//TODO:
// - File upload for profile picture DONE
// - place holder styling
// - limit file types 
// - image upload loading state DONE
// - request permissions correctly

const Signup = ({ navigation }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        profile_picture: '',
        password: '',
        confirm_password: '',
        error: '',
    });
    const { name, email, profile_picture, password, confirm_password, error } = values;

    const updateUser = useUserUpdate();

    const [imageLoading, setImageLoading] = useState(false);

    
    const init = async () => {
        const seed = await Math.floor(Math.random() * 999999);
        const url = await `https://avatars.dicebear.com/api/micah/${seed}.png`
        await setValues({...values, profile_picture: url});
    };

    useEffect(() => {
        init();
    },[]);

    const handleChange = name => value => {
        setValues({...values, [name]: value});
    };

    const handleValidation = () => {
        if (!name) {
            setValues({...values, error: 'Username cannot be empty', success: false});
            return false;
        }
        else {
            if (!name.match('^[a-zA-Z0-9 ]{4,15}$')) { //no special characters
                setValues({...values, error: 'Username cannot contain special characters and must be 4-15 characters long', success: false});
                return false;
            }
        }
        if (!email) {
            setValues({...values, error: 'Email cannot be empty', success: false});
            return false;
        }
        else {
            if (!EmailValidator.validate(email)) { //I know im a poser :( 
                setValues({...values, error: 'Email must be valid', success: false});
                return false;
            }
        }
        if (!profile_picture) {
            setValues({...values, error: 'Please select a profile picture (or choose a random one)', success: false});
            return false;
        }
        if (!password) {
            setValues({...values, error: 'Password cannot be empty', success: false});
            return false;
        }
        else {

            if (!password.match('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$')) {
                setValues({...values, error: `Password must contain an uppercase, at least one special character, at least one digit, at least 3 lowercase letters, and at least 8 characters long`, success: false});
                return false;
            }


            if (!password.match('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$')) {
                setValues({...values, error: `Password must contain at least one uppercase, one special character, one digit, and at least 8 characters long`, success: false});
                return false;
            }
        }

        if (password !== confirm_password) {
            setValues({...values, error: `Passwords must match`, success: false});
            return false;
        }



        return true;
    };

    const pickImage = async () => {
        setImageLoading(true)
        let result =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, //only accept jpg, png, gif, webp,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        getSignedRequest(result).then(response => {
            if (response.error) {
                console.log(res.error); //SET ERROR HERE
                setImageLoading(false);
            }
            else {
                uploadFile(result, response.signedRequest, response.url).then(imgUrl => {
                    setValues({...values, 'profile_picture': imgUrl});
                });
                setImageLoading(false);
            }
        });

        if (!result.canceled) {
            setValues({...values, profile_picture: result.uri});
            setImageLoading(false);
        }
    };

    const generateSeed = () => {
        const seed = Math.floor(Math.random() * 999999);
        const url = `https://avatars.dicebear.com/api/micah/${seed}.png`
        setValues({...values, profile_picture: url})
    }; 

    const clickSubmit = () => {
        if (!handleValidation()) {
            return
        }

        setValues({...values, error: ''});
        signUp({name, email, profile_picture, password, fromMobile: true}).then(signUpRes => {
            if(signUpRes.error) {
                if (signUpRes.error.includes('email')) {
                    setValues({...values, error: 'Account with this email already exists'});
                }
                else if (signUpRes.error.includes('name')) {
                    setValues({...values, error: 'Username already taken' });
                }
                else {
                    setValues({...values, error: signUpRes.error});
                }
            }
            else {
                authenticate(signUpRes, () => {
                    updateUser(signUpRes);
                });
            }
        });
    };

    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>
                <Text style={styles.title}> Create Account </Text>

                {error && <Error errorText={error}/> }

                <TextInput 
                    placeholder='Email'
                    onChangeText={handleChange('email')}
                    autoCapitalize='none'
                    style={styles.input}
                />

                <TextInput 
                    placeholder='Username'
                    onChangeText={handleChange('name')}
                    autoCapitalize='none'
                    style={styles.input}
                />

                <TextInput 
                    placeholder='Password'
                    onChangeText={handleChange('password')}
                    textContentType='password-new'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    style={styles.input}
                />

                <TextInput 
                    placeholder='Confirm Password'
                    onChangeText={handleChange('confirm_password')}
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    style={styles.input}
                />
            </View>
            
            
            <Text style={styles.pfpText}> Profile Picture </Text>
            <View style={styles.pfpContainer}>
                <View style={styles.pfp}>
                    <Image
                        source={{ uri: profile_picture }}
                        style={{ width: 50, height: 50 }}
                    />
                </View>

                <Pressable style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadButtonText}> 
                        {imageLoading ? 'Loading...' : 'Upload Image' }
                    </Text>
                </Pressable>

            </View>
            <Pressable onPress={generateSeed}>
                <Text style={{ color: 'blue', marginLeft: 37}}> Random </Text>
            </Pressable>


            <View style={styles.bottom}>
                <Pressable style={styles.signupButton} onPress={clickSubmit}>
                    <Text style={{ color: 'white', fontSize: 20 }}> Create Account </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textContainer: {
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 30,
        marginTop: 40,
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    createAcc: {
        margin: 8,
        fontFamily: 'Inter-Black',
        fontSize: 20,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 70
    },

    signupButton: {
        paddingVertical: 10,
        paddingHorizontal: 90,
        backgroundColor: '#6267fe',
        borderRadius: 8
    },

    pfpContainer: {
        flexDirection: 'row',
        marginLeft: '10%'
    },

    pfp: {
        marginTop:5,
        borderRadius: 40,
        borderWidth: 1,
        overflow: 'hidden'
    },

    pfpText: {
        fontFamily: 'Inter-Black',
        marginLeft: '10%',
        fontSize: 15,
        fontWeight: '100'
    },

    uploadButton: {
        justifyContent: 'center',
        marginLeft: 8,
    },

    uploadButtonText: {
        backgroundColor: 'whitesmoke',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
});

export default Signup;
