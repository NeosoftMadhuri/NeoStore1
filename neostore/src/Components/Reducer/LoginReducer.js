const initialState = { Login: false, uuid: '' }
const loginReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'enable':
      return { ...state, Login: true, uuid: '' }
    case 'disable':
      return { ...state, Login: false, uuid: actions.payload }
    default:
      return state;
  }
}
export default loginReducer