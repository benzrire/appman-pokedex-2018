const initState = {
  modal: false
}

const controller = (state = initState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return {
        modal: action.modal
      }
    default:
      return state
  }
}

export default controller
