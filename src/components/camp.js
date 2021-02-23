import React from 'react';
import { DateTime } from 'luxon';

import Dateselector from './dateselector.js';
import { renderLink } from '../utils.js';

class Camp extends React.Component {
    constructor(props) {
        super(props);
        this.camp = props.camp;
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            startDate: this.props.date ? DateTime.fromJSDate(this.props.date[0]).toISODate() : null,
            endDate: this.props.date ? DateTime.fromJSDate(this.props.date[1]).toISODate() : null,
            quantity: this.props.quantity ? this.props.quantity : 2,
        }
    }
    handleChange(e) {
        this.props.handleChange(e);
    }
    dateSelected = (date) => {
        console.log(this.camp)
        this.setState({
            ...this.state,
            startDate: date[0],
            endDate: date[1],
        }, () => {
            this.props.onChange({productId: this.camp.id, categories: this.camp.categories, productName: this.camp.name, quantity: this.state.quantity, startDate: date[0], endDate: date[1] });
        });
    }
    quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        });
        if(this.state.startDate) {
            this.props.onChange({productId: this.camp.id, categories: this.camp.categories, productName: this.camp.name, quantity: quantity, startDate: this.state.startDate, endDate: this.state.endDate });
        }
    }

    render() {
        return (
            <div id={this.camp.id} className="skogsrum">
                <img className="image" alt={this.camp.name} src={this.camp.imgUrl} />
                <h3>{this.camp.name}</h3>
                <div className="wrapper">
                    <p>{this.camp.description} {renderLink(this.camp.infoUrl)}</p>
                    <div>
                        <div className="number-wrapper mt-1"><input onChange={this.quantitySelected} type="number" min="1" max={this.camp.capacity} className="mr-1 numberbox" defaultValue={this.state.quantity}/><span>ANTAL PERSONER</span></div>
                        <div><span>Pris per person: </span><span className="price_big">{ Math.ceil(this.camp.priceFirstNight) } :- /natt</span></div>
                    </div>
                    <Dateselector key={this.props.date} range={true} unavailableDates={this.camp.unavailableDates} dateCallback={this.dateSelected} date={this.props.date} minDate={new Date(this.camp.earliest)} maxDate={new Date(this.camp.latest)} />
                    <span className="small"><em>Välj ankomst- och avresedag. <br/>Grå dag går att checka ut på. </em></span>
                </div>    
            </div>
        );   
    }
}

export default Camp;
