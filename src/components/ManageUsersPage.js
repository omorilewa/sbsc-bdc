import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { ManageUsers, ErrorComponent } from '.';
import { transformUsers, FETCH_USERS } from '../util';
import { UserStyles as styles } from '../styles';

class ManageUsersPage extends PureComponent {
  static navigationOptions = {
    title: 'MANAGE USERS',
  }

  render() {
    return (
      <Query query={FETCH_USERS}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return (
              <View style={styles.modalBackground}>
                <View style={styles.spinner}>
                  <ActivityIndicator
                    size="large"
                    color="#9c9e9f" />
                </View>
              </View>
            )
          }
          if (error) {
            return <ErrorComponent errorText="Error while fetching users" />;
          }
          if (data) {
            const transformedUsers = transformUsers(data);
            return (
              <ManageUsers
                usersData={transformedUsers}
                fetchMore={fetchMore}
                endCursor={data.usersConnection.pageInfo.endCursor}
              />
            );
          }
        }}
      </Query>
    );
  }
};

export default ManageUsersPage;
