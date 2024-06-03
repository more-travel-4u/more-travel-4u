import { Share, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ShareWith = (props) => {
  const shareMessage = async () => {
    const options = {
      title: 'Sharing!',
      message: "Hello World, we're planning our trip!",
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
      <Text>SHARE WITH FRIENDS</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          shareMessage();
        }}>
        <Text style={styles.buttonText}>SHARE MESSAGE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          shareURL();
        }}>
        <Text style={styles.buttonText}>SHARE LINK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#66A182',
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
  },
});

export default ShareWith;