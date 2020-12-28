import React from 'react';

class Food extends React.Component {
    constructor(props) {
        super(props);
        this.food = props.food;
        this.state = {
            date: {},
            quantity: 0, 
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.handleChange(e);
    }
    quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        }, () => {
            this.props.onChange({id: this.food.id, name: this.food.name, data: this.state});
        });
    }
    render() {
        return (
            <div className="food">
                
                <div className="wrapper">
                    
                    <h3 className="mt-1">{this.food.name}</h3>
                    <p>{this.food.description}</p>
                    <a href={"https://naturlogi.se/" + this.food.url} className="button mb-2">LÄS MER</a>
                    <div className="number-wrapper mt-1"><input onChange={this.quantitySelected} type="number" min="0" className="mr-1 numberbox" /><span>ANTAL PERSONER</span></div>
                    <span className="price">{this.food.priceFirstNightIncTax}:- /pers</span>
                </div>
                <img className="image" alt="foodbasket" src="/img/food.png" />
            </div>
        );
    }
}

export default Food;
