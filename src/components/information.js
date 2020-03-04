import React from 'react';

function Information() {
    return (
        <div className="information">
        <h2>ÖVRIG INFO</h2>
        <label htmlFor="name">Namn</label>
        <input name="name"/>

        <label htmlFor="email">Emailadress</label>
        <input name="email"/>

        <label htmlFor="other">Övrig info</label>
        <textarea name="other"/>
        </div>
    );
}

export default Information;
