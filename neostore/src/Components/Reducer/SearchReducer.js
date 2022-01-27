const initialState = { searchitem: '' }

const searchReducer = (state = initialState, actions) => {
  switch (actions.type) {

    case 'search':
      return { ...state, searchitem: actions.payload }
    default:
      return state;
  }

}
export default searchReducer
