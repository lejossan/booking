import React from 'react';

function Food(props) {
    const food = props.food;

    return (
        <div className="food">
            
            <div className="wrapper">
                
                <h3 className="mt-1">{food.name}</h3>
                <p>{food.info}</p>
                <a href={"https://naturlogi.se/" + food.url} className="button mb-2">LÄS MER</a>
                <div className="number-wrapper mt-1"><input  type="number" min="0" className="mr-1 numberbox" /><span>ANTAL PERSONER</span></div>
                <span className="price">{food.price}:- /pers/natt</span>
            </div>
            <img className="image" alt="foodbasket" src="/img/food.png" />
        </div>
    );
}

export default Food;
