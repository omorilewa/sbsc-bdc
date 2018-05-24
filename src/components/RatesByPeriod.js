import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import { object, oneOf } from 'prop-types';
import { StyledText as Text } from ".";
import moment from 'moment';
import { PrevRateStyles as styles } from "../styles";
import { sortRates, loadImage } from '../util';



const RatesByPeriod = ({ period, rates }) =>
	<Fragment>
		{(rates[period] && rates[period].length > 0) &&
			<View style={styles.row}>
				<View style={styles.inner}>
					<View style={styles[period]}></View>
					<Text style={styles.heading2}>{period[0].toUpperCase() + period.slice(1)}</Text>
				</View>
				<View style={styles.curView}>
					<Text style={styles.heading}>Trade</Text>
				</View>
				<View style={styles.curView}>
					<Text style={styles.heading}>FX Rates</Text>
				</View>
				<View style={styles.curView}>
					<Text style={styles.heading}>Time posted</Text>
				</View>
			</View>}
		<View>
			{sortRates(rates[period]).map((el, index) =>
				<View key={index}>
					{el &&
						<View style={styles.main}>
							<View style={styles.inner}>
								<Image style={styles.img} source={loadImage(el.node.rate.currency)} />
								<Text style={styles.curText}>{el.node.rate.currency}</Text>
							</View>
							<View style={styles.curView}>
								<Text style={styles.text}>Buy / Sell</Text>
							</View>
							<View style={styles.curView}>
								<Text style={styles.text2} key={index}>{el.node.rate.buyRate} / {el.node.rate.sellRate}</Text>
							</View>
							<View style={styles.curView}>
								<Text style={styles.text}>{moment(el.node.createdAt).add(60, 'minutes').utc().format('LT')}</Text>
							</View>
						</View>}
				</View>
			)}
		</View>
	</Fragment>;

RatesByPeriod.propTypes = {
	period: oneOf(["morning", "afternoon", "evening"]).isRequired,
	rates: object.isRequired,
};

export default RatesByPeriod;
