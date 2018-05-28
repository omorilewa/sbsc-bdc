import React, { PureComponent, Fragment } from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import { node } from 'prop-types';

class SideMenuItemWrapper extends PureComponent {
  static propTypes = {
    children: node
  }

  render() {
    const isIos = Platform.OS === 'ios';
    return (
      <Fragment>
        {isIos &&
          <TouchableOpacity {...this.props}>
            {this.props.children}
          </TouchableOpacity>
        }
        {!isIos &&
          <TouchableNativeFeedback {...this.props}>
            {this.props.children}
          </TouchableNativeFeedback>
        }
      </Fragment>
    );
  }
};

export default SideMenuItemWrapper;
