import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, ActivityIndicator } from 'react-native';
import { LoaderStyles as styles } from '../styles';

const Loader = (props) => {
  const {
    loading,
    closeModal
  } = props;
  return (
    <Modal
      transparent
      onRequestClose={() => closeModal}
      animationType={'slide'}
      visible={loading}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            color="#9c9e9f"
            animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Loader;
