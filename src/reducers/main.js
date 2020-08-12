const initialState = {
    myOther: 'hello',
    myDate: new Date(),
    myList: {},
};
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                myDate: action.payload
            }
        case 'SET_OTHER':
            return {
                ...state,
                myOther: state.myOther + " and.... hello again"
            }
        case 'INITIAL':
            return {
                ...state,
                myList: {}
            }
        case 'RELOAD':
            return {
                ...state,
                myList: {}
            }
        default:
            return state
    }
    
}