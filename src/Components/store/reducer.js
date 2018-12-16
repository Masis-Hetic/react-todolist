const initialState = {
	toggleForm: 'close'
};

const reducer = (state = initialState, action) => {
	const newState = {...initialState};

	if (action.type === 'OPEN_CLOSE') {
		newState.toggleForm = newState.toggleForm === 'close' ? 'open' : 'close';
		initialState.toggleForm = initialState.toggleForm === 'close' ? 'open' : 'close';
	}

	return newState;
};

export default reducer;