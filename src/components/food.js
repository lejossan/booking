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
        debugger;
        this.props.handleChange(e);
    }
    dateSelected = (date) => {
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
    quantitySelected = (e) => {
        const quantity = e.target.value;
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
                <h3 className="mt-1">{this.food.name}</h3>
                <img className="image" alt="foodbasket" src={this.food.imgUrl} />
                <div className="wrapper">
                    <div>
                        <p>{this.food.description}</p>
                        <div className="number-wrapper mt-1">
                        <div className="number-wrapper mt-1">
                            <input ref={(quantity) => { this.quantity = quantity }} onChange={(evt) => this.quantitySelected(evt)} type="number" min="1" className="mr-1 numberbox" defaultValue="1"/><span>ANTAL PERSONER</span></div>
                        </div>
                        <span className="price">{Math.ceil(this.food.priceFirstNight)}:- /pers</span>
                    </div>
                    
                    <Dateselector key={this.props.date} range="false" dateCallback = {this.dateSelected} date={this.props.date} minDate={new Date(this.food.earliest)} maxDate={new Date(this.food.latest)} />
                </div>
                
            </div>
        );
    }
}

export default Food;
