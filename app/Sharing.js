import { Share, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ShareWith = (props) => {
  const shareMessage = async () => {
    const options = {
      title: 'Sharing!',
      message: "Ready to plan our next trip?",
    };
    const response = await Share.share(options);
    return false;
  };
  const shareURL = async () => {
    const options = {
      title: 'Sharing!',
      url: 'https://www.google.com',
    };
    const response = await Share.share(options);
    return false;
  };

  return (
    <View style={styles.container}>
      {/* <Text>SHARE WITH FRIENDS</Text> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          shareMessage();
        }}>
        <Text style={styles.buttonText}>Share Message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          shareURL();
        }}>
        <Text style={styles.buttonText}>Share Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#85A295',
  },
  button: {
    backgroundColor: '#e4c4bb',
    width: '65%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    fontSize: '18',
    color: '#85A295',
    fontWeight: 'bold',
  },
});

export default ShareWith;