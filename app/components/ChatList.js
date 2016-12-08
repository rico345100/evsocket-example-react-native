import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5
	},
	text: {
		paddingBottom: 5
	}
});

const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1.id !== r2.id
});

class ChatList extends Component {
	renderRow = rowData => (<Text style={styles.text}>{rowData.who}: {rowData.message}</Text>)
	render() {
		let { chatList } = this.props;
		let dataSource = ds.cloneWithRows(chatList);
		
		return (
			<View style={styles.container}>
				<ListView
					ref="listView"
					style={styles.container}
					dataSource={dataSource}
					renderRow={this.renderRow}
					enableEmptySections={true}
					onContentSizeChange={ (contentWidth, contentHeight) => {
						// scroll to bottom, but give some delays.
						setTimeout(() => {
							this.refs.listView.scrollTo({
								x: contentWidth,
								y: contentHeight,
								animated: true
							});
						}, 300);
					}}
				/>
			</View>
		);
	}
}

export default connect(state => {
	return {
		chatList: state.ChatReducer.chatList
	};
})(ChatList);