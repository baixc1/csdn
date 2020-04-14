import React from 'react';
import './index.scss'
let isDown = false
let clientX, clientY

export default class Dashboard extends React.Component {
  state = {
    x: 10,
    y: 10
  }
  componentDidMount() {
    window.onmouseup = () => {
      isDown = false
    }
    window.onmousemove = e => {
      if (!isDown) return
      let { clientX: currentClinetX, clientY: currentClinetY } = e
      let { x, y } = this.state
      this.setState({
        x: x + currentClinetX - clientX,
        y: y + currentClinetY - clientY
      })
      clientX = currentClinetX
      clientY = currentClinetY
    }
  }
  mousedown = e => {
    isDown = true;
    ({ clientX, clientY } = e)
  }
  render() {
    let { x, y } = this.state
    let style = { top: y + 'px', left: x + 'px' }
    return (
      <div className="main">
        <img src="/src/images/1.gif" />
        <div className="move-text"
          style={style}
          onMouseDown={this.mousedown}
        >Hello World</div>
        <div>x:{x},y:{y}</div>
      </div>
    )
  }
}
