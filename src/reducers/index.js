import { combineReducers } from 'redux'

import controller from './controller'
import pokedex from './pokedex'

export default combineReducers({
  controller,
  pokedex
})
