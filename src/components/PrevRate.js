import React, { PureComponent } from "react";
import { array, string, func } from "prop-types";
import { View, TouchableOpacity, FlatList } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import { StyledText as Text, RatesByPeriod } from ".";
import { PrevRateStyles as styles } from "../styles";

class PrevRate extends PureComponent {
  static propTypes = {
    prevRateData: array.isRequired,
    fetchMore: func,
    endCursor: string,
  }

  state = {
    prevRateData: this.props.prevRateData,
    isFiltering: false,
  }

  componentDidMount() {
    this.filterData(this.state.prevRateData, 'All data');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.prevRateData !== prevState.prevRateData) {
      return {
        prevRateData: nextProps.prevRateData,
      };
    }
    return null;
  }

  filterData = (initial, filterBy) => {
    let result;
    switch (filterBy) {
      case ('Today'):
        result = initial.filter((element) => {
          return moment().isSame((element.date), 'day') && element;
        });
        break;
      case ('This week'):
        result = initial.filter(element => {
          const isThisWeek = element.date >= moment().startOf('week').format('YYYY-MM-DD') &&
            element.date <= moment().endOf('week').format('YYYY-MM-DD');
          return isThisWeek && element;
        });
        break;
      case ('This month'):
        result = initial.filter(element => {
          const isThisMonth = element.date >= moment().startOf('month').format('YYYY-MM-DD') &&
            element.date <= moment().endOf('month').format('YYYY-MM-DD');
          return isThisMonth && element;
        });
        break;
      default:
        result = initial;
        break;
    }
    return result;
  };

  onClickDropDown = (value) => {
    let isFiltering = true
    if (value === 'All data') {
      isFiltering = false
    }
    this.setState(() => ({
      isFiltering,
      prevRateData: this.filterData(this.props.prevRateData, value)
    }))
  }

  render() {
    const { prevRateData } = this.state;
    const { fetchMore, endCursor } = this.props;
    return (
      <View style={styles.outerview}>
        <View style={styles.wrapper} >
          <Text style={styles.filter}>Filter by: </Text>
          <TouchableOpacity onPress={() => { this.dropDown && this.dropDown.show(); }}>
            <View style={styles.modalView}>
              <ModalDropdown ref={(el) => { this.dropDown = el }}
                options={["All data", "This week", "Today", "This month"]}
                defaultValue={"All data"}
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
        <FlatList
          data={prevRateData}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            if (!this.state.isFiltering) {
              fetchMore({
                variables: { cursor: endCursor },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const nestedObjectIsValid = !!fetchMoreResult &&
                    !!fetchMoreResult.viewer &&
                    !!fetchMoreResult.viewer.user &&
                    !!fetchMoreResult.viewer.user.previousRatesConnection;

                  if (nestedObjectIsValid) {
                    const { edges: newEdges = [], pageInfo } = fetchMoreResult.viewer.user.previousRatesConnection;
                    return newEdges.length
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
                }
              });
            }
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
    );
  }
};

export default PrevRate;
