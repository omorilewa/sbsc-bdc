import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { string, number } from 'prop-types';
import { StyledText as Text } from '.';
import { UserListStyles as styles } from '../styles';

class UserListItem extends Component {
  static navigationOptions = {
    title: 'USER ITEM',
  }

  static propTypes = {
    id: number,
    Name: string,
    Username: string,
    Role: string,
    Status: string,
  }

  state = {
    isActive: this.props.Status === "Active" ? true : false,
    statusText: '',
    actionButtonText: ''
  }

  componentDidMount() {
    this.toggleActiveStatus();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.Status !== prevState.Status) {
      return {
        Status: nextProps.Status,
      };
    }
    return null;
  }

  toggleActiveStatus = () => {
    if (this.state.isActive) {
      this.setState((state, props) => ({
        statusText: "Active",
        actionButtonText: "Deactivate",
        isActive: false
      }))
    } else if (!this.state.isActive) {
      this.setState((state, props) => ({
        statusText: "Inactive",
        actionButtonText: "Activate",
        isActive: true
      }))
    }
  }

  render() {
    const {
      toggleActiveStatus,
      state: { isActive, statusText, actionButtonText },
      props: { id, Name, Username, Role }
    } = this;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.numTextView}>
          <Text style={styles.listItem}>{id}</Text>
        </View>
        <View style={[styles.noGaps, styles.nameColumn]}>
          <Text style={styles.listItem}>{Name}</Text>
        </View>
        <View style={[styles.noGaps, styles.usernameColumn]}>
          <Text style={styles.listItem}>{Username}</Text>
        </View>
        <View style={[styles.noGaps, styles.status]}>
          <Text style={styles.listItem}>{Role}</Text>
        </View>
        <View style={styles.noGaps}>
          <Text style={styles.listItem}>{statusText}</Text>
        </View>
        <TouchableHighlight
          underlayColor="#19B01D"
          onPress={toggleActiveStatus}
          style={isActive ?
            [styles.statusButton, styles.button, styles.inActiveUserColor] :
            [styles.statusButton, styles.button]
          }
        >
          <View>
            <Text style={styles.listItem}>{actionButtonText}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default UserListItem;
