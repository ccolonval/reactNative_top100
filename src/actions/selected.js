
import{ GET_SONGS, GET_HITS } from '../core/types';
import axios from "axios";

export const getSongs = (albumId) => async (dispatch, getState) => {
	const response = await axios.get("https://itunes.apple.com/lookup?id=" + albumId + "&entity=song");
	dispatch({
		type: GET_SONGS,
		payload: response.data.results
	});
};

export const getHits = (artistId) => async (dispatch, getState) => {
    const response = await axios.get("https://itunes.apple.com/lookup?id="+ artistId +"&entity=song");
	dispatch({
		type: GET_HITS,
		payload: response.data.results
	});
};