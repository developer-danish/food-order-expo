import { View, StyleSheet, Text } from 'react-native';

export const showLoading = () => (
    <>
    <View style={styles.loading} className="spinner-grow text-primary" role="status">
        <Text>Loading...</Text>
    </View>
    {/* <View className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
    </View>
    <View className="spinner-grow text-success" role="status">
        <span className="visually-hidden">Loading...</span>
    </View>
    <View className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
    </View>
    <View className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
    </View>
    <View className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
    </View>
   
    <View className="spinner-grow text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
    </View> */}
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