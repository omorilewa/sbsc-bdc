import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'native-base';
import { array, func } from 'prop-types';
import { FAQStyles as styles } from '../styles';

export const Questions = ({
  faqs,
  showDetail,
  toggleShow
}) => {
	return faqs.map((item, index) => {
		let show = false

		if (showDetail.length > 0) {
			show = showDetail[index].show;
    }

		return (
			<View key={index} styles={styles.questionsView}>
				<TouchableHighlight underlayColor="#f4f4f4" onPress={() => toggleShow(index)}>
				<View style={styles.textHeader}>
					<View style={styles.dropdownView}>
						<Text style={show ? [styles.text, styles.black] : styles.text}>{item.question}</Text>
						{show ?
								<Icon style={styles.show} name='md-remove' /> :
								<Icon style={styles.hide} name='md-add' />
							}
					</View>
				</View>
				</TouchableHighlight>
				<View style={styles.subView}>
          {show && <Text style={styles.subText}>{item.answer}</Text>}
				</View>
			</View>
		)
	})
};

Questions.propTypes = {
  showDetail: array,
  faqs: array,
  toggleShow: func,
}
