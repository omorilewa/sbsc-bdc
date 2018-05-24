import React, { Component } from 'react';
import { View } from 'react-native';
import { UsersTableHeader, UserListItem } from '.';
import { allUsers } from '../util';
import { UserListStyles as styles } from '../styles';

class ManageUsers extends Component {
  static navigationOptions = {
    title: 'MANAGE USERS',
  }

  render() {
    return (
      <View>
        <UsersTableHeader />
          {allUsers.map((item, index) => (
          <View
            key={index}
            style={(index % 2 === 0) ?
              styles.usersView :
              [styles.usersView, styles.listBGColor]}>
              <UserListItem
                id={item["#"]}
                Name={item.Name}
                Username={item.Username}
                Role={item.Role}
                Status={item.Status}
                key={index}/>
            </View>
          ))}
      </View>
    );
  }
}

export default ManageUsers;

