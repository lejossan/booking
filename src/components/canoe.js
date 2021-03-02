import React from 'react';
import { renderLink } from '../utils.js';
import Dateselector from './dateselector.js';

class Canoe extends React.Component {
    constructor(props) {
        super(props);
        this.rental = props.rental;
        this.state = {
            quantity: this.props.quantity ? this.props.quantity : this.rental.capacity,
            date: this.props.date,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.handleChange(e);
    }
    dateSelected = (date) => {
        this.setState({
            ...this.state,
            date: date,
            quantity: this.state.quantity,
        }, () => {
            this.props.onChange({productId: this.rental.id, productName: this.rental.name, quantity: this.state.quantity, startDate: date, endDate: date });
        });
    }
    quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        });
        if(this.state.date) {
            this.props.onChange({productId: this.rental.id, productName: this.rental.name, quantity: quantity, startDate: this.state.date, endDate: this.state.date });
        }
    }
    renderQuantity = () => {
        if(this.rental.name != 'Kanot') {
            return (<div className="number-wrapper mt-1"><input  type="number" min="0" max={this.rental.capacity} onChange={this.quantitySelected} defaultValue={this.state.quantity} className="mr-1 numberbox" /><span>Antal {this.rental.name}</span></div>);
        }
    }
    render() {

        return (
            <div className="canoe mb-5">
                <div className="wrapper">
                    <img className="image" alt="canoe" src={this.rental.imgUrl} />
                    <div>
                        <h3 className="mt-1">{this.rental.name}</h3>
                        <p>{this.rental.description} {renderLink(this.rental.infoUrl)}</p>
                        {this.renderQuantity()}
                        <div><span>Pris per dag:</span><span className="price_big ml-1">{ Math.ceil(this.rental.priceFirstNight) } :-</span></div>
                    </div>
                    <div className="dateselector">
                        <Dateselector key={this.props.date} range={false} caption={false} unavailableDates={this.rental.unavailableDates} dateCallback={this.dateSelected} date={this.props.date} minDate={new Date(this.rental.earliest)} maxDate={new Date(this.rental.latest)} />
                        <span className="small"><em>Välj dag för att boka</em></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Canoe;
