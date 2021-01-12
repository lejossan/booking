import React from 'react';

function Gadget(props) {
    const gadget = props.gadget;

    return (
        <div className="gadget">
            
            <div className="wrapper">
                <h3 className="mt-1">{gadget.name}</h3>
                <p>{gadget.info}</p>
                <a href={"https://naturlogi.se/" + gadget.url} className="button mb-2">LÄS MER</a>
                <div className="number-wrapper mt-1"><input  type="number" min="0" className="mr-1 numberbox" /><span>ANTAL PERSONER</span></div>
                <span className="_big">{gadget.price}:- /pers/natt</span>
            </div>
            <div className={"image image-" + gadget.image}>
            </div>
        </div>
    );
}

export default Gadget;
