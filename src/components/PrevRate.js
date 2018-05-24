import React, { Component } from "react";
import { array } from "prop-types";
import { View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import { StyledText as Text, RatesByPeriod } from ".";
import { PrevRateStyles as styles } from "../styles";

class PrevRate extends Component {
  static propTypes = {
    prevRateData: array.isRequired
  }

  state = {
    prevRateData: this.props.prevRateData,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.prevRateData !== prevState.prevRateData) {
      return {
        prevRateData: nextProps.prevRateData,
      };
    }
    return null;
  }

  setLocalTime = (element) => {
    let time = '';
    if (element.morning.length > 0) {
      time = moment(element.morning[0].createdAt).subtract(120, 'minutes')
    }
    else if (element.afternoon.length > 0) {
      time = moment(element.afternoon[0].createdAt).subtract(120, 'minutes')
    }
    else if (element.evening.length > 0) {
      time = moment(element.evening[0].createdAt).subtract(120, 'minutes')
    }
    return time;
  }

  filterData = (initial, filterBy) => {
    let result;
    switch (filterBy) {
      case ('Today'):
        result = initial.filter((element) => {
          return moment().isSame(this.setLocalTime(element), 'day')
        });
        break;
      case ('This week'):
        result = initial.filter(element => {
          return this.setLocalTime(element) <= moment().endOf('week')
        });
        break;
      case ('This month'):
      default:
        result = initial.filter(element => {
          return this.setLocalTime(element) <= moment().endOf('month')
        });
        break;
    }
    return result;
  };

  onClickDropDown = (value) => {
    this.setState(() => ({
      prevRateData: this.filterData(this.props.prevRateData, value)
    }))
  }

  render() {
    const { prevRateData } = this.state;
    const { fetchMore, endCursor, hasNextPage} = this.props;
    return (
      <ScrollView>
        <View style={styles.wrapper} >
          <Text style={styles.filter}>Filter by: </Text>
          <TouchableOpacity onPress={() => { this.dropDown && this.dropDown.show(); }}>
            <View style={styles.modalView}>
              <ModalDropdown ref={(el) => { this.dropDown = el }}
                options={["This week", "Today", "This month"]}
                defaultValue={"This month"}
                style={styles.modal}
                textStyle={styles.buttonText}
                dropdownStyle={styles.dropdown}
                dropdownTextStyle={styles.dropdowntext}
                adjustFrame={(style) => {
                  style.height = 88;
                  style.top = 144;
                  return style;
                }}
                onSelect={(index, value) => { this.onClickDropDown(value) }}
              />
              <Text style={styles.arrow}>▼</Text>
            </View>
            <View style={styles.hr}></View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={prevRateData}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              fetchMore({
                variables: { cursor: endCursor },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult.viewer.user.previousRatesConnection.edges;
                  const pageInfo = fetchMoreResult.viewer.user.previousRatesConnection.pageInfo;

                  return newEdges.length && hasNextPage
                    ? {
                        viewer: {
                          __typename: previousResult.viewer.__typename,
                          user: {
                            __typename: previousResult.viewer.user.__typename,
                            previousRatesConnection: {
                              __typename: previousResult.viewer.user.previousRatesConnection.__typename,
                              edges: [...previousResult.viewer.user.previousRatesConnection.edges, ...newEdges],
                              pageInfo
                            }
                          }
                        }
                      }
                    : previousResult;
                }
              });
            }}
            renderItem={({ item, index }) =>
              <View key={index} style={index % 2 === 0 ? styles.body : [styles.body, styles.bg]}>
                <Text style={styles.day}>{item.date}</Text>
                <RatesByPeriod rates={item} period="morning" />
                <RatesByPeriod rates={item} period="afternoon" />
                <RatesByPeriod rates={item} period="evening" />
              </View>
            } />
        </View>
      </ScrollView>
    );
  }
};

export default PrevRate;
