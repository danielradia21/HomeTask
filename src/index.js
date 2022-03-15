import React from 'react';
import ReactDOM from 'react-dom';
import { RootCmp } from './root-cmp';
import './assets/styles/main.scss';
ReactDOM.render(
    <React.StrictMode>
        <RootCmp />
    </React.StrictMode>,
    document.getElementById('root')
);
