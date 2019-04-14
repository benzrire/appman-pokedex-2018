import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

import ContentCard from './components/contentcard'
import Modal from './components/modal'
import { UI_COLORS } from './constraints'
import { setModal } from './actions'

const ROUND_BUTTON = {
  backgroundColor: UI_COLORS.bottomBarBackground,
  color: UI_COLORS.bottomBarTextColor,
  lineHeight: '90px',
  borderRadius: '50%',
  border: 'none',
  height: '90px',
  width: '90px',
  fontSize: '60px',
  marginTop: '-50px'
}

class App extends Component {

  addClickHandler = (event) => {
    this.props.setModal(true)
  }

  render() {
    return (
      <div className="App d-flex flex-column align-items-start" style={{minHeight: '100%'}}>
        <div className="w-100 p-3 text-center">
          <h1 className="font-atma">My Pokedex</h1>
        </div>
        <div className="w-100 overflow-auto p-3" style={{maxHeight: '575px'}}>
          <div className="row">
            {this.props.pokedex.dex.map((card, index) => <div key={"i-" + index} className="col-6 mt-4"><ContentCard key={"c-" + index} info={card}/></div>)}
          </div>
        </div>
        <div className="mt-auto text-center w-100"
          style={{backgroundColor: UI_COLORS.bottomBarBackground, color: UI_COLORS.bottomBarTextColor, position: 'relative', height: '50px'}}>
          <button onClick={(e) => this.addClickHandler(e)} style={ROUND_BUTTON}>+</button>
        </div>
        {this.props.controller.modal && <Modal />}
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  controller: state.controller,
  pokedex: state.pokedex
})

const mapDispatchToProps = {
  setModal
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
