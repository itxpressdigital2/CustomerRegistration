import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class Button extends Component {
	render() {
		const { title, onButtonPress, backgroundColor } = this.props;
		return (
			<TouchableOpacity
				onPress={onButtonPress}
				style={[styles.container, { backgroundColor: backgroundColor || '#f4511e' }]}
			>
				<Text style={styles.titleStyle}>{title}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = {
	container: {
		padding: 15,
		alignSelf: 'center',
		backgroundColor: '#f4511e',
		borderRadius: 8,
		marginVertical: 10,
		width: 300,
	},

	titleStyle: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
	},
};
