export const mainDateAction = date => dispatch => {
	dispatch({
		type: "SET_DATE",
		payload: date
	});
};

export const mainOtherAction = () => dispatch => {
	dispatch({
		type: "SET_OTHER"
	});
};

export const mainInitialAction = () => dispatch => {
	dispatch({
		type: "INITIAL"
	});
};

export const mainReloadAction = () => dispatch => {
	dispatch({
		type: "RELOAD"
	});
};
