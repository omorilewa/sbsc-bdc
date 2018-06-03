import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { PrevRate, ErrorComponent } from '.';
import { transformData, PREV_RATES } from '../util';
import { View } from 'native-base';
import { Query } from 'react-apollo';
import { LoaderStyles as styles } from '../styles';

class PrevRatePage extends Component {
  static navigationOptions = {
    title: "PREVIOUS RATES"
  };

  render() {
    return (
      <Query query={PREV_RATES}>
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
          const edges = data.viewer && data.viewer.user.previousRatesConnection.edges;
          const endCursor = data.viewer && data.viewer.user.previousRatesConnection.pageInfo.endCursor;
          return (
              <PrevRate
                prevRateData={transformData(edges)}
                fetchMore={fetchMore}
                endCursor={endCursor} />
          );
        }}
      </Query>
    );
  }
}

export default PrevRatePage;
