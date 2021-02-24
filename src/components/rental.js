import React from 'react';
import { DateTime } from 'luxon';

import { renderLink } from '../utils.js';
import Dateselector from './dateselector.js';

class Rental extends React.Component {
    constructor(props) {
        super(props);
        this.rental = props.rental;
        this.state = {
            startDate: this.props.date ? DateTime.fromJSDate(this.props.date[0]).toISODate() : null,
            endDate: this.props.date ? DateTime.fromJSDate(this.props.date[1]).toISODate() : null,
            quantity: this.props.quantity ? this.props.quantity : 2,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.handleChange(e);
    }
    dateSelected = (date) => {
        const startDate = date.length > 1 ? date[0] : date;
        const endDate = date.length > 1 ? date[1] : date;
        this.setState({
            ...this.state,
            date: date,
            quantity: this.state.quantity,
        }, () => {
            this.props.onChange({productId: this.rental.id, productName: this.rental.name, quantity: this.state.quantity, startDate: startDate, endDate: endDate });
        });
    }
    quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        });
        if(this.state.startDate) {
            this.props.onChange({productId: this.rental.id, categories: this.rental.categories, productName: this.rental.name, quantity: quantity, startDate: this.state.startDate, endDate: this.state.endDate });
        }
    }
    renderDate = (date) => {
        return (<span>{date.toFormat("dd MMM yy")}</span>);
    }

    getDates = (startDate, endDate) => {
        const result = [];

        let date = startDate;
        while(!date.hasSame(endDate.plus({days: 1}), "day")) {
            result.push(date);
            date = date.plus({days: 1});
        }

        return result;
    }

    render() {
        return (
            <div className="rental">
                <div className="wrapper">
                    <h3 className="mt-1">{this.rental.name}</h3>
                    <p>{this.rental.description}</p>
                    <div className="number-wrapper mt-1"><input  type="number" min="0" max={this.rental.capacity} onChange={this.quantitySelected} defaultValue={this.state.quantity} className="mr-1 numberbox" /><span>ANTAL</span></div>
                    <div><span>Första natten:</span><span className="price_big">{ Math.ceil(this.rental.priceFirstNight) } :- /natt</span></div>
                    <div><span>Efterföljande nätter:</span><span className="price_big"> { Math.ceil(this.rental.priceSubsequentNights) } :- /natt</span></div>
                    <Dateselector key={this.props.date} range={true} unavailableDates={this.rental.unavailableDates} dateCallback={this.dateSelected} date={this.props.date} minDate={new Date(this.rental.earliest)} maxDate={new Date(this.rental.latest)} />
                </div>
            </div>
        );
    }
}

export default Rental;
