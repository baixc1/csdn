
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'

console.log('i am index.js')

class Search extends React.Component {
    render() {
        return <div className="search-text">
            <h1>1223444</h1>
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);