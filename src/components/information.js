import React from 'react';

function Information() {
    return (
        <div className="information">
        <h3>Övrig info:</h3>
        <label htmlFor="name">Namn</label>
        <input name="name" type="text"/>

        <label htmlFor="email">Emailadress</label>
        <input name="email" type="email"/>

        <label htmlFor="other">Övrig info</label>
        <textarea name="other" type="text"/>
        </div>
    );
}

export default Information;
