import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { UsersTableHeader, UserListItem } from '.';
import { UserListStyles as styles } from '../styles';

class ManageUsers extends Component {
  state = {
    usersData: this.props.usersData,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.usersData !== prevState.usersData) {
      return {
        usersData: nextProps.usersData,
      };
    }
    return null;
  }

  render() {
    const {
      state: { usersData },
      props: { fetchMore, endCursor, hasNextPage }
    } = this;

    return (
      <View>
        <UsersTableHeader />
        <FlatList
          data={usersData}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={(index % 2 === 0) ?
                styles.usersView :
                [styles.usersView, styles.listBGColor]}>
                <UserListItem
                  id={item.id}
                  name={item.name}
                  username={item.username}
                  role={item.role}
                  status={item.status}
                  key={index}/>
            </View>
          )}
          onEndReached={() => {
            fetchMore({
              variables: { cursor: endCursor },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const { edges: newEdges, pageInfo } = fetchMoreResult.usersConnection;

                return newEdges.length && hasNextPage
                  ? {
                      usersConnection: {
                        __typename: previousResult.usersConnection.__typename,
                        pageInfo,
                        edges: [...previousResult.usersConnection.edges, ...newEdges],
                      }
                    }
                  : previousResult;
              }
            });
          }}
        />
      </View>
    );
  }
};

export default ManageUsers;

