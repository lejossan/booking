import React from 'react';
import ReactDOM from 'react-dom';
import './fonts/Raleway/Raleway-Regular.ttf';
import './fonts/Lato/Lato-Regular.ttf';
import './index.css';
import ScriptTag from 'react-script-tag';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Demo = props => (
    <ScriptTag type="text/javascript" src="https://use.fontawesome.com/releases/v5.12.0/css/all.css?ver=5.2.1" />
    );

ReactDOM.render(
    <App/>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
