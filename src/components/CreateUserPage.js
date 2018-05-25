import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { Query } from 'react-apollo';
import { GET_LOCATION, sortLocation } from '../util';
import { CreateUserForm, ErrorComponent } from '.';
import { UserStyles as styles } from '../styles';


class CreateUserPage extends Component {
  static navigationOptions = {
    title: 'ADD USER',
  }

  render() {
    return (
      <Query query={GET_LOCATION}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return (
          <View style={styles.modalBackground}>
            <View style={styles.spinner}>
              <ActivityIndicator
                size="large"
                color="#9c9e9f" />
            </View>
          </View>
        )
        if (error) {
          return <ErrorComponent errorText="Unable to retrieve data" />
        }
        return (
          <View style={styles.wrapperView}>
            <CreateUserForm data={data} location={sortLocation(data.locations)}/>
          </View>
        );
      }}
    </Query>
    );
  }
}

export default CreateUserPage;

