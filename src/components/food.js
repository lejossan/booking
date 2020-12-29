import React from 'react';
import Dateselector from './dateselector.js';

class Food extends React.Component {
    constructor(props) {
        super(props);
        this.food = props.food;
        this.state = {
            quantity: 1, 
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.handleChange(e);
    }
    dateSelected = (date) => {
        console.log(date)
        const quantity = this.state.quantity > 0 ? this.state.quantity : 1;
        this.setState({
            ...this.state,
            startDate: date,
            endDate: date,
            quantity: quantity,
        }, () => {
            this.props.onChange({productId: this.food.id, productName: this.food.name, quantity: this.state.quantity, startDate: date, endDate: date });
        });
    }
    quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        }, () => {
            if(this.state.startDate) {
                this.props.onChange({productId: this.food.id, productName: this.food.name, quantity: quantity, startDate: this.state.startDate, endDate: this.state.endDate });
            }
        });
    }
    render() {
        return (
            <div className="food">
                
                <div className="wrapper">
                    
                    <h3 className="mt-1">{this.food.name}</h3>
                    <p>{this.food.description}</p>
                    <a href={"https://naturlogi.se/" + this.food.url} className="button mb-2">LÄS MER</a>
                    <div className="number-wrapper mt-1"><input onChange={this.quantitySelected} type="number" value={this.state.quantity} min="1" className="mr-1 numberbox" /><span>ANTAL PERSONER</span></div>
                    <span className="price">{Math.ceil(this.food.priceFirstNight)}:- /pers</span>
                    <Dateselector range="false" dateCallback = {this.dateSelected} minDate={new Date(this.food.earliest)} maxDate={new Date(this.food.latest)} />
                </div>
                <img className="image" alt="foodbasket" src="/img/food.png" />
            </div>
        );
    }
}

export default Food;
