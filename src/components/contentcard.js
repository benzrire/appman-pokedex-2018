import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UI_COLORS } from '../constraints'
import { setPokedex } from '../actions'

class ContentCard extends Component {

  state = {
    cardHover: false
  }

  cutes = (n, name) => {
    let ret = []
    for(let i = 0; i < n; i++) {
      ret.push(<img key={name + i} style={{width: '30px', height: '30px', marginLeft: '5px'}} src={require('../cute.png')} />)
    }
    return ret
  }

  cardMouseOverHandler = (event) => {
    event.preventDefault()
    this.setState({cardHover: true})
  }

  cardMouseLeaveHandler = (event) => {
    this.setState({cardHover: false})
  }

  delClickHandler = (event) => {
    const index = this.props.pokedex.dex.indexOf(this.props.info)
    this.props.setPokedex([...this.props.pokedex.dex.slice(0, index), ...this.props.pokedex.dex.splice(index + 1)])
  }

  calculateHp = (hp) => {
    if(hp !== undefined) {
      return hp > 100 ? 100 : hp
    }else {
      return 0
    }
  }

  calculateStr = (str) => {
    if(str !== undefined) {
      return str.length * 50
    }else {
      return 0
    }
  }

  calculateWeakness = (weak) => {
    if(weak !== undefined) {
      return weak.length * 100
    }else {
      return 0
    }
  }

  calculateDamage = (dmg) => {
    let ret = 0
    if(dmg !== undefined) {
      dmg.forEach((d) => {
        ret += parseInt(d.damage.split(/\D/))
      })
    }
    return ret
  }

  calculateHappiness = (pokemon) => {
    if(pokemon.weaknesses !== undefined && pokemon.hp !== undefined && pokemon.attacks !== undefined) {
      let ret = ((this.calculateHp(pokemon.hp) / 10) + (this.calculateDamage(pokemon.attacks) / 10) + 10 - (pokemon.weaknesses.length)) / 5
      return ret
    }else {
      return 0
    }
  }

  render() {
    return(
      <div className="card"
        onMouseOver={(e) => this.cardMouseOverHandler(e)}
        onMouseLeave={(e) => this.cardMouseLeaveHandler(e)}>
        <div className="card-body d-flex flex-row p-2"
          style={{backgroundColor: UI_COLORS.cardBackground}}>
          <img className="align-self-center" style={{width: '100px', height: '140px'}} src={this.props.info.imageUrl} />
          <div className="d-flex flex-column pl-2 w-100">
            <div className="d-flex flex-row w-100 justify-content-between">
              <span style={{fontSize: '28px', fontFamily: 'gaegu'}}>{this.props.info.name}</span>
              {this.state.cardHover && <button className="close" type="button" onClick={(e) => this.delClickHandler(e)} style={{fontSize: '25px', color: UI_COLORS.bottomBarBackground}}>X</button>}
            </div>
            <div className="d-flex flex-row w-100">
              <span style={{fontSize: '16px'}}>HP</span>
              <div className="progress w-75 ml-auto" style={{backgroundColor: UI_COLORS.levelTubeBackground, marginTop: '3px'}}>
                <div className="progress-bar" style={{width: this.calculateHp(this.props.info.hp) + '%', backgroundColor: UI_COLORS.levelTubeValueBackground}}
                  aria-valuenow={this.calculateHp(this.props.info.hp)} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div className="d-flex flex-row w-100">
              <span style={{fontSize: '16px'}}>STR</span>
              <div className="progress w-75 ml-auto" style={{backgroundColor: UI_COLORS.levelTubeBackground, marginTop: '3px'}}>
                <div className="progress-bar" style={{width: this.calculateStr(this.props.info.attacks) + '%', backgroundColor: UI_COLORS.levelTubeValueBackground}}
                  aria-valuenow={this.calculateStr(this.props.info.attacks)} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div className="d-flex flex-row w-100">
              <span style={{fontSize: '16px'}}>WEAK</span>
              <div className="progress w-75 ml-auto" style={{backgroundColor: UI_COLORS.levelTubeBackground, marginTop: '3px'}}>
                <div className="progress-bar" style={{width: this.calculateWeakness(this.props.info.weaknesses) + '%', backgroundColor: UI_COLORS.levelTubeValueBackground}}
                  aria-valuenow={this.calculateWeakness(this.props.info.weaknesses)} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div className="d-flex flex-row w-100 pt-2">
              {this.cutes(this.calculateHappiness(this.props.info), this.props.info.name)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pokedex: state.pokedex
})

const mapDispatchToProps = {
  setPokedex
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentCard)
