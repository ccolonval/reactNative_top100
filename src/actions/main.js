import{ GET_DATA_FEED } from '../core/types';

import axios from "axios";

export const getDataFeed = () => async (dispatch, getState) => {
	const response = await axios.get("https://itunes.apple.com/us/rss/topalbums/limit=100/json");
	dispatch({
		type: GET_DATA_FEED,
		payload: response.data.feed.entry
	});
};