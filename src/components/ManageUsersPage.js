import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { ManageUsers, ErrorComponent, Loader } from '.';
import { transformUsers, FETCH_USERS } from '../util';


class ManageUsersPage extends PureComponent {
  static navigationOptions = {
    title: 'MANAGE USERS',
  }

  render() {
    return (
      <Query query={FETCH_USERS}>
        {({loading, error, data}) => {
          if(loading) {
            return <Loader loading={loading} />;
          }
          if(error) {
            return <ErrorComponent errorText="Error while fetching users" />;
          }
          return <ManageUsers usersData={transformUsers(data)} />;
        }}
      </Query>
    );
  }
};

export default ManageUsersPage;
