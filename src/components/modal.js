import React, { Component } from 'react'
import { connect } from 'react-redux'

import Request from 'es6-request'
import { UI_COLORS } from '../constraints'
import { setModal, setPokedex } from '../actions'
import ModalCard from './modalcard'

const outsideStyle = {
  zIndex: '1999',
  left: '0px',
  top: '0px',
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: UI_COLORS.modalOutside
}

const modalStyle = {
  zIndex: '2000',
  left: '3%',
  top: '3%',
  width: '94%',
  height: '95%',
  position: 'absolute',
  borderRadius: '3px',
  boxShadow: '1px 1px 2px ' + UI_COLORS.modalContentBoxShadow,
  backgroundColor: UI_COLORS.modalContentBackground
}

class Modal extends Component {

  state = {
    card: null,
    name: ''
  }

  searchRequest = (name) => {
    const url = name.length > 0 ? 'http://localhost:3030/api/cards?limit=20&name=' + name : 'http://localhost:3030/api/cards?limit=50'
    Request.get(url).then(([body, res]) => {
      let cards = JSON.parse(body).cards
      this.props.pokedex.dex.forEach((d, index) => {
        for(let i = 0; i < cards.length; i++) {
          if(cards[i].name.valueOf() === d.name.valueOf()) {
            cards = [...cards.slice(0, i), ...cards.splice(i + 1)]
          }
        }
      })
      this.setState({card: cards})
    })
  }

  componentDidMount() {
    this.searchRequest(this.state.name)
  }

  componentDidUpdate() {
    this.searchRequest(this.state.name)
  }

  outsideClickHandler = (event) => {
    this.props.setModal(false)
  }

  onChangeHandler = (event) => {
    this.setState({name: event.target.value})
  }

  render() {
    return(
      <div>
        <div onClick={(e) => this.outsideClickHandler(e)} style={outsideStyle}></div>
        <div style={modalStyle} className="d-flex flex-column p-2 overflow-auto">
          <div className="d-flex flex-row">
            <input onChange={(e) => this.onChangeHandler(e)} style={{fontSize: '20px'}} type="text" className="form-control font-gaegu" placeholder="Find pokemon" />
            <img className="ml-2" style={{width: '37px', height: '37px'}} src={require('../search.png')} />
          </div>
          {this.state.card !== null && <div className="row justify-content-center">
            {this.state.card.map((card, index) => <div key={"r-" + index} className="col-12 mt-4"><ModalCard key={"c-" + index} info={card}/></div>)}
          </div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  controller: state.controller,
  pokedex: state.pokedex
})

const mapDispatchToProps = {
  setModal, setPokedex
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
