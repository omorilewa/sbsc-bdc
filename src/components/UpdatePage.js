import React from 'react';
import { View, FlatList, ActivityIndicator, Linking, TouchableHighlight } from 'react-native';
import { StyledText as Text, ErrorComponent } from '.';
import { Query } from 'react-apollo';
import { FETCH_APKS } from '../util';
import { UpdateApkStyles as styles } from '../styles';

const UpdatePage = () => (
  <Query query={FETCH_APKS}>
    {({ loading, error, data }) => {
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
      const apklist = data.allAdminAppApks;
      return (
        <FlatList
          data={apklist}
          renderItem={({ item, index }) => (
            <View style={{ marginBottom: 8 }}>
              <TouchableHighlight onPress={() => Linking.openURL(item.url)}>
                <View
                  key={index}
                  style={(index % 2 !== 0) ?
                    styles.usersView :
                    [styles.usersView, styles.listBGColor]}>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              </TouchableHighlight>
            </View>
          )}
        />
      );
    }}
  </Query>
);

export default UpdatePage;
