
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './images/xiaoxin.jpg'
import './index.less'
require('./hello')()
alert(2)
class Search extends React.Component {
    render() {
        return <div className="search-text">
            <h1>1223444</h1>
            <img src={logo} />
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);