import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  SubHeader,
  Questions,
  FAQModalForm,
  StyledText as Text
} from '.';
import { FAQStyles as styles } from '../styles';
import { faqs } from '../util';

const textObject = {
  first: "Frequently Asked Questions",
  second: "Can't find what you are looking for?",
  third: "Report a problem",
  fourth: "REPORT A PROBLEM"
}
class FAQPage extends Component {
  static navigationOptions = {
    title: 'FAQ PAGE',
  }

  state = {
    showDetail: [],
    modalVisible: null,
  }

  componentDidMount() {
    const showDetail = faqs.map(() => ({ show: false }));
    this.setState(() => ({ showDetail }));
  }

  componentWillUnmount() {
    this.hideModal();
  }

  toggleShow = (index) => {
    const { showDetail } = this.state;
    const currentFlag = showDetail[index].show;
    const newDetail = showDetail.map((detail) => ({ show: false}));
    newDetail.splice(index, 1, { show: !currentFlag });
    this.setState(() => ({
      showDetail: newDetail
    }))
  }


  showModal = () => {
    this.setState((state) => ({
      modalVisible: 1
    }));
  }

  hideModal = () => {
    this.setState((state) => ({
      modalVisible: null
    }));
  }


  render() {
    const {
      showModal,
      hideModal,
      toggleShow,
      state: { showDetail, modalVisible }
    } = this;

    return (
      <View style={styles.wrapperView}>
        <SubHeader pageHeaderText="HELP" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.textView}>
          <Text style={styles.faqText}>{textObject.first}</Text>
        </View>
        <Questions
          faqs={faqs}
          showDetail={showDetail}
          toggleShow={toggleShow}
        />
        <View style={styles.textView}>
          <Text style={styles.footer}>{textObject.second}</Text>
        </View>
          <TouchableHighlight
            underlayColor="#19B01D"
            style={styles.buttonBody}
            onPress={showModal}
          >
            <Text style={styles.buttonText}>{textObject.third}</Text>
          </TouchableHighlight>
        </ScrollView>
        <Modal
          isVisible={modalVisible === 1}
          backdropOpacity={0.6}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeadingView}>
              <Text style={styles.modalTextHeading}>{textObject.fourth}</Text>
            </View>
            <View style={styles.hr}></View>
            <FAQModalForm />
            <View style={styles.buttonsView}>
              <TouchableHighlight
                underlayColor="white"
                style={styles.modalButtons}
                onPress={hideModal}>
                <Text style={styles.backText}>BACK</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="white"
                style={styles.modalButtons}
                onPress={hideModal}>
                <Text style={styles.sendText}>SEND</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default FAQPage;

