import React from 'react';
import { DateTime } from 'luxon';
import Dateselector from './dateselector.js';

class Rental extends React.Component {
    constructor(props) {
        super(props);
        this.rental = props.rental;
        this.state = {
            quantity: 1, 
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.handleChange(e);
    }
    dateSelected = (date) => {
        const startDate = date.length > 1 ? date[0] : date;
        const endDate = date.length > 1 ? date[1] : date;
        const quantity = this.state.quantity > 0 ? this.state.quantity : 1;
        this.setState({
            ...this.state,
            date: date,
            quantity: quantity,
        }, () => {
            this.props.onChange({productId: this.rental.id, productName: this.rental.name, quantity: this.state.quantity, startDate: startDate, endDate: endDate });
        });
    }
    renderLink = (url) => {
        if(url) {
            return (<a href={url} className="button mb-2">LÄS MER</a>);
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

    renderDateSelector = () => {
        if(this.props.lodgingDates && this.props.lodgingDates.length > 0) {
        const startDate = this.props.lodgingDates ? this.props.lodgingDates[0] : "";
        const endDate = this.props.lodgingDates ? this.props.lodgingDates[1] : "";
        const days = this.getDates(DateTime.fromJSDate(startDate), DateTime.fromJSDate(endDate));
        return (
            <ul className="dateSelect mt-2">
                <li><em>Välj önskade datum:</em></li>
                {days.map(day => {
                    return <li key={day.toISODate()}><input type="radio" name={"date-"+this.rental.productId} onChange={this.dateSelected} value={day.toString()}></input><label className="ml-1">{this.renderDate(day)}</label></li>
                })}
            </ul>);
        } else {
           return (<em className="mt-2">Välj datum för boende först för att kunna välja datum för mat.</em>);
        }
    }
    render() {
        return (
            <div className="rental">
                <div className="wrapper">
                    <h3 className="mt-1">{this.rental.name}</h3>
                    <p>{this.rental.description}</p>
                    {this.renderLink(this.rental.infoUrl)}
                    <div className="number-wrapper mt-1"><input  type="number" min="0" max={this.rental.capacity} defaultValue="1" className="mr-1 numberbox" /><span>ANTAL</span></div>
                    <div><span>Första natten:</span><span className="price_big">{ Math.ceil(this.rental.priceFirstNight) } :- /natt</span></div>
                    <div><span>Efterföljande nätter:</span><span className="price_big"> { Math.ceil(this.rental.priceSubsequentNights) } :- /natt</span></div>
                    {/* {this.renderDateSelector()} */}
                    <Dateselector key={this.props.date} range={this.props.range} unavailableDates={this.rental.unavailableDates} dateCallback={this.dateSelected} date={this.props.date} minDate={new Date(this.rental.earliest)} maxDate={new Date(this.rental.latest)} />
                    <span className="small"><em>Välj ankomst- och avresedag (tryck 2 gånger på samma dag för att välja en dag) </em></span>
                </div>
            </div>
        );
    }
}

export default Rental;
