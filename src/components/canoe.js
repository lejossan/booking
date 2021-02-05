import React from 'react';
import { renderLink } from '../utils.js';
import Dateselector from './dateselector.js';

class Canoe extends React.Component {
    constructor(props) {
        super(props);
        this.rental = props.rental;

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.handleChange(e);
    }
    dateSelected = (date) => {
        this.props.onChange({productId: this.rental.id, productName: this.rental.name, quantity: 1, startDate: date, endDate: date });
    }
  
    render() {

        return (
            <div className="canoe mb-5">
                <div className="wrapper">
                    <img className="image" alt="canoe" src={this.rental.imgUrl} />
                    <div>
                        <h3 className="mt-1">{this.rental.name}</h3>
                        <p>{this.rental.description} {renderLink(this.rental.infoUrl)}</p>
                        
                        <div><span>Pris per dag:</span><span className="price_big ml-1">{ Math.ceil(this.rental.priceFirstNight) } :-</span></div>
                    </div>
                    <div>
                        <Dateselector key={this.props.date} range={false} unavailableDates={this.rental.unavailableDates} dateCallback={this.dateSelected} date={this.props.date} minDate={new Date(this.rental.earliest)} maxDate={new Date(this.rental.latest)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Canoe;
