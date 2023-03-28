import { View, StyleSheet, Text } from 'react-native';

export const showLoading = () => (
    <>
    <View style={styles.loading} className="spinner-grow text-primary" role="status">
        <Text>Loading...</Text>
    </View>
    </>
);

const styles = StyleSheet.create({
    loading: {
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