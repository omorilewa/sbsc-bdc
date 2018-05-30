import React, { Component } from 'react';
import { View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { string, number, bool } from 'prop-types';
import { StyledText as Text } from '.';
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
        {isActive &&
          <Mutation mutation={DEACTIVATE_USER} onError={this.showError} onCompleted={this.clearForm}>
            {(deactivateUser, { data, loading, error }) => {
              if (loading) {
                return (
                  <View style={styles.modalBackground}>
                    <View style={styles.spinner}>
                      <ActivityIndicator
                        size="small"
                        color="#9c9e9f" />
                    </View>
                  </View>
                )
              }
              return (
                <TouchableHighlight
                  underlayColor="#19B01D"
                  onPress={() =>
                    deactivateUser({
                      variables: { userId },
                      refetchQueries: [{ query: FETCH_USERS }]
                    })
                  }
                  style={[styles.statusButton, styles.button, styles.inActiveUserColor]}
                >
                  <View>
                    <Text style={styles.listItem}>{actionButtonText}</Text>
                  </View>
                </TouchableHighlight>
              )

            }}
          </Mutation>
        }
        {!isActive &&
          <Mutation mutation={APPROVE_USER} onError={this.showError} onCompleted={this.clearForm}>
            {(approveUser, { data, loading, error }) => {
              if (loading) {
                return (
                  <View style={styles.modalBackground}>
                    <View style={styles.spinner}>
                      <ActivityIndicator
                        size="small"
                        color="#9c9e9f" />
                    </View>
                  </View>
                )
              }
              return (<TouchableHighlight
                underlayColor="#19B01D"
                style={[styles.statusButton, styles.button]}
                onPress={() =>
                  approveUser({
                    variables: { userId },
                    refetchQueries: [{ query: FETCH_USERS }]
                  })
                }
              >
                <View>
                  <Text style={styles.listItem}>{actionButtonText}</Text>
                </View>
              </TouchableHighlight>)
            }}
          </Mutation>

        }
      </View>
    );
  }
}

export default UserListItem;
