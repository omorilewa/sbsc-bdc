import React from 'react';
import { View, ScrollView, } from 'react-native';
import { UpdatePage, SubHeader, StyledText as Text } from '.';
import { UpdateApkStyles as styles } from '../styles';

const Update = () => (
  <View style={styles.wrapperView}>
    <SubHeader pageHeaderText="AVAILABLE APKS" settings />
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
      <View style={styles.wordingView}>
        <Text style={styles.wording}>
          Click any of the links below to download the specified versions of the apk. Versions are arranged in the order of the most recent.
        </Text>
      </View>
      <UpdatePage />
    </ScrollView>
  </View>
);

export default Update;
