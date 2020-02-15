import React from 'react';

import Dateselector from './dateselector.js';

function Skogsrum(props) {
    const skogsrum = props.skogsrum;

    return (
        <div id={"booking-" + skogsrum.name} className="skogsrum">
            <div className={"image image-" + skogsrum.image}>
                <h2>{skogsrum.name}</h2>
            </div>
            <div className="calendar">
                <p>{skogsrum.info}</p>
                <a href={"https://naturlogi.se/" + skogsrum.url} className="button mb-2">LÄS MER</a>
                <div className="number-wrapper mt-1"><input className="number" /><span>ANTAL PERSONER</span></div>
                <span className="price">{skogsrum.price}:- /pers/natt</span>
                <Dateselector />
            </div>    
        </div>
    );
}

export default Skogsrum;
