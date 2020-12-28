import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import Information from '../components/information.js';

function Checkout() {
    return (
        <div>
            <Link to="/" className="button" >Back</Link>
            <h2>Checkout</h2>
            <label htmlFor="discount">Rabattkod/Presentkort</label>
            <input name="discount" type="text"/>
            <Information />
        </div>
    );
}

export default Checkout;
