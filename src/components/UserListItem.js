import React, { Component } from 'react';
import { View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { string, number, bool } from 'prop-types';
import { StyledText as Text, ErrorComponent } from '.';
import { UserListStyles as styles } from '../styles';
import { Mutation } from 'react-apollo';
import { APPROVE_USER, DEACTIVATE_USER, FETCH_USERS } from '../util';

class UserListItem extends Component {
  static navigationOptions = {
    title: 'USER ITEM',
  }

  static propTypes = {
    id: number,
    name: string,
    username: string,
    role: string,
    status: bool,
  }

  state = {
    isActive: this.props.status,
    statusText: this.props.status ? "Active" : "Inactive",
    actionButtonText: this.props.status ? "Deactivate" : "Activate",
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.status !== prevState.status) {
      return {
        isActive: nextProps.status,
        statusText: nextProps.status ? "Active" : "Inactive",
        actionButtonText: nextProps.status ? "Deactivate" : "Activate",
      };
    }
    return null;
  }

  render() {
    const {
      state: { isActive, statusText, actionButtonText },
      props: { id, name, username, role, userId }
    } = this;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.numTextView}>
          <Text style={styles.listItem}>{id}</Text>
        </View>
        <View style={[styles.noGaps, styles.nameColumn]}>
          <Text style={styles.listItem}>{name}</Text>
        </View>
        <View style={[styles.noGaps, styles.usernameColumn]}>
          <Text style={styles.listItem}>{username}</Text>
        </View>
        <View style={[styles.noGaps, styles.status]}>
          <Text style={styles.listItem}>{role}</Text>
        </View>
        <View style={styles.noGaps}>
          <Text style={styles.listItem}>{statusText}</Text>
        </View>
        <Mutation mutation={isActive ? DEACTIVATE_USER : APPROVE_USER} onError={this.showError} onCompleted={this.clearForm}>
          {(changeUserStatus, { data, loading, error }) => {
            if (loading) {
              return (
                <View style={styles.spinner}>
                  <ActivityIndicator
                    size="small"
                    color="#9c9e9f"
                  />
                </View>
              )
            } else if (error) {
              return <ErrorComponent errorText="An error occured while updating user status" />
            }
            return (
              <TouchableHighlight
                underlayColor="#19B01D"
                onPress={() =>
                  changeUserStatus({
                    variables: { userId },
                    refetchQueries: [{ query: FETCH_USERS }]
                  })
                }
                style={isActive ?
                  [styles.statusButton, styles.button] :
                  [styles.statusButton, styles.button, styles.inActiveUserColor]
                }
              >
                <View>
                  <Text style={styles.listItem}>{actionButtonText}</Text>
                </View>
              </TouchableHighlight>
            );
          }}
        </Mutation>
      </View>
    );
  }
}

export default UserListItem;
