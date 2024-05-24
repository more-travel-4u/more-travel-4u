import React from 'react';
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

const FloatingAdd = ({
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
  navigation
}) => {
  const [isExtended, setIsExtended] = React.useState(true);

  const isIOS = Platform.OS === 'ios';

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFAB
        icon={'map-plus'}
        onPress={() => {
          navigation.navigate("CreateNewEvent")
        }}
        visible={visible}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </SafeAreaView>
  );
};

export default FloatingAdd;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});