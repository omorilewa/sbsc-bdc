import React from 'react';
import { View, Image } from 'react-native';
import { string } from 'prop-types';
import { StyledText as Text } from '.';
import { SubHeaderStyles as styles } from '../styles';
import { SuperHeader } from '.';
import settingsIcon from '../assets/images/icon_settings.png';
import helpIcon from '../assets/images/icon_help.png';

const SubHeader = ({ pageHeaderText, settings }) => {
  return (
    <View>
      <SuperHeader />
      <View style={styles.subSection}>
        <Image
          style={settings ? styles.imageIcon: styles.helpIcon}
          source={ settings ? settingsIcon : helpIcon }
        />
        <Text style={styles.subHeaderText}>{pageHeaderText}</Text>
      </View>
    </View>
  );
}

SubHeader.propTypes = {
  pageHeaderText: string
}

SubHeader.defaultProps = {
  pageHeaderText: "HELP"
}

export default SubHeader;
