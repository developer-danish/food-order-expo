import { StyleSheet, Text } from "react-native";

export const showErrorMsg = (msg) => {
    return <>
        <Text style={styles.errorMsg}>
            {msg}
        </Text>
    </>
}

export const showSuccessMsg = (msg) => {
    return <>
        <Text style={styles.successMsg}>
            {msg}
        </Text>
    </>
};

const styles = StyleSheet.create({
    errorMsg: {
        width: '100%',
        backgroundColor: 'red',
        color: '#05375a',
        height: 'auto',
        padding: 10,
        borderRadius: 5,
        fontSize: 14,
        fontWeight: "bold"
    },
    successMsg: {
        width: '100%',
        backgroundColor: 'green',
        color: '#05375a',
        height: 'auto',
        padding: 10,
        borderRadius: 5,
        fontSize: 14,
        fontWeight: "bold"
    }
})