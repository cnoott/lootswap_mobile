import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';

const SuccessModal = ({setOpen, open, title, desc, buttonText, navigateTo}) => (
    <View>
        <Modal
            animationType='slide'
            visible={open}
            transparent={true}
            onRequestClose={() => setOpen(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{desc}</Text>
                    <Pressable
                        style={styles.button}
                        onPress={navigateTo}
                    >
                        <Text style={styles.textStyle}>{buttonText}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    </View>
);

export default SuccessModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 28,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#6267fe',
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    description: {
        fontSize: 15,
        marginBottom: 8
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
