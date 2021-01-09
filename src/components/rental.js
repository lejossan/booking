import React from 'react';
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
        const quantity = this.state.quantity > 0 ? this.state.quantity : 1;
        this.setState({
            ...this.state,
            startDate: date,
            endDate: date,
            quantity: quantity,
        }, () => {
            this.props.onChange({productId: this.rental.id, productName: this.rental.name, quantity: this.state.quantity, startDate: date, endDate: date });
        });
    }
    renderLink = (url) => {
        if(url) {
            return (<a href={url} className="button mb-2">LÄS MER</a>);
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
                <div><span>Första natten:</span><span className="price">{ Math.ceil(this.rental.priceFirstNight) } :- /natt</span></div>
                <div><span>Efterföljande nätter:</span><span className="price"> { Math.ceil(this.rental.priceSubsequentNights) } :- /natt</span></div>
                <Dateselector key={this.props.date} range="false" dateCallback={this.dateSelected} date={this.props.date} minDate={new Date(this.rental.earliest)} maxDate={new Date(this.rental.latest)} />
            </div>
            </div>
        );
    }
}

export default Rental;
