const initState = {
  dex: []
}

const pokedex = (state = initState, action) => {
  switch (action.type) {
    case 'SET_POKEDEX':
      return {
        dex: action.dex
      }
    default:
      return state
  }
}

export default pokedex
