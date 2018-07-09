import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import {
  View,
  ScrollView,
  Image,
} from 'react-native';
import { SideMenuStyles as styles } from '../styles';
import { getItem, clearStorage, persistor, client } from '../util';
import { StyledText as Text, SideMenuItemWrapper } from '.';

class SideMenu extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    isAdmin: false,
    username: '',
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({ routeName: route });
    this.props.navigation.dispatch(navigateAction);
  }

  async componentDidMount() {
    try {
      const userType = await getItem('userType');
      const username = await getItem('username');
      this.setState(() => ({
        username,
        isAdmin: userType === 'BDCAdmin' ? true : false
      }))
    } catch (err) {
      this.setState(() => ({
        username: '',
        isAdmin: false
      }))
    }
  }

  render() {
    const {
      navigateToScreen,
      props: { navigation: { navigate } },
      state: { isAdmin, username }
    } = this;

    return (
      <View style={styles.flex}>
        <ScrollView>
          {
            !isAdmin &&
            <SideMenuItemWrapper onPress={navigateToScreen('NewRate')} underlayColor="#004900">
              <View style={styles.label}>
                <Image
                  style={styles.newRateIcon}
                  source={require(`../assets/images/icon_calendar.png`)}
                />
                <Text style={styles.menuItemsText}>INPUT NEW RATE</Text>
              </View>
            </SideMenuItemWrapper>
          }

          {
            !isAdmin &&
            <SideMenuItemWrapper onPress={navigateToScreen('PrevRate')} underlayColor="#004900">
              <View style={styles.label}>
                <Image
                  style={styles.prevRateIcon}
                  source={require(`../assets/images/icon_news.png`)}
                />
                <Text style={styles.menuItemsText}>PREVIOUS RATES</Text>
              </View>
            </SideMenuItemWrapper>
          }

          {
            isAdmin &&
            <SideMenuItemWrapper onPress={navigateToScreen('CreateUser')} underlayColor="#004900">
              <View style={[styles.label, styles.userLabel]}>
                <Image
                  style={styles.icon}
                  source={require(`../assets/images/icon_profile.png`)}
                />
                <Text style={[styles.menuItemsText, styles.usersText]}>CREATE USERS</Text>
              </View>
            </SideMenuItemWrapper>
          }
          {
            isAdmin &&
            <SideMenuItemWrapper onPress={navigateToScreen('ManageUsers')} underlayColor="#004900">
              <View style={[styles.label, styles.userLabel]}>
                <Image
                  style={styles.configIcon}
                  source={require(`../assets/images/icon_settings.png`)}
                />
                <Text style={[styles.menuItemsText, styles.usersText]}>MANAGE USERS</Text>
              </View>
            </SideMenuItemWrapper>
          }
          {
            isAdmin &&
            <SideMenuItemWrapper onPress={navigateToScreen('Configuration')} underlayColor="#004900">
              <View style={styles.label}>
                <Image
                  style={styles.configIcon}
                  source={require(`../assets/images/icon_settings.png`)}
                />
                <Text style={[styles.menuItemsText, styles.helpText]}>RATE BOUNDARIES</Text>
              </View>
            </SideMenuItemWrapper>
          }
          {
            isAdmin &&
            <SideMenuItemWrapper onPress={navigateToScreen('PostSchedule')} underlayColor="#004900">
              <View style={styles.label}>
                <Image
                  style={styles.configIcon}
                  source={require(`../assets/images/icon_settings.png`)}
                />
                <Text style={[styles.menuItemsText, styles.helpText]}>POST SCHEDULE</Text>
              </View>
            </SideMenuItemWrapper>
          }
          <SideMenuItemWrapper onPress={navigateToScreen('Update')} underlayColor="#004900">
            <View style={styles.label}>
              <Image
                style={styles.configIcon}
                source={require(`../assets/images/icon_settings.png`)}
              />
              <Text style={[styles.menuItemsText, styles.helpText]}>APP UPDATES</Text>
            </View>
          </SideMenuItemWrapper>
          {
            !isAdmin &&
            <SideMenuItemWrapper onPress={navigateToScreen('Help')} underlayColor="#004900">
              <View style={styles.label}>
                <Image
                  style={styles.icon}
                  source={require(`../assets/images/icon_help.png`)}
                />
                <Text style={[styles.menuItemsText, styles.helpText]}>HELP</Text>
              </View>
            </SideMenuItemWrapper>
          }
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.hr} />
          <View style={styles.bottom}>
            <View>
              <SideMenuItemWrapper
                underlayColor='#004900'
                onPress={() => {
                  navigate('Main');
                  clearStorage();
                  persistor.pause();
                  persistor.purge();
                  client.resetStore();
                }}>
                <Text style={styles.logoutText}>LOG OUT</Text>
              </SideMenuItemWrapper>
              <Text style={styles.bottomTxt}>{username}</Text>
            </View>
            <Image
              style={[styles.icon, styles.logoutIcon]}
              source={require(`../assets/images/icon_profile.png`)}
            />
          </View>
        </View>

      </View>
    );
  }
}

export default SideMenu;
