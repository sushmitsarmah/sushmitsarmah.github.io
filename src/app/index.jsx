import React from 'react';
import { render } from 'react-dom';

import 'semantic-ui-css/semantic.css';
// import './test.styl';

class Root extends React.Component {
    render(){
        return (
            <h4>Test react</h4>
        );
    }
}

render(<Root/>, document.getElementById('app'))
