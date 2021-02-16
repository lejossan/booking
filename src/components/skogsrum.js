import React from 'react';
import { renderLink } from '../utils.js';
import Dateselector from './dateselector.js';

class Skogsrum extends React.Component {
    constructor(props) {
        super(props);
        this.skogsrum = props.skogsrum;
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.handleChange(e);
    }
    dateSelected = (date) => {
        this.setState({
            ...this.state,
            date: date,
        }, () => {
            this.props.onChange({productId: this.skogsrum.id, categories: this.skogsrum.categories, productName: this.skogsrum.name, quantity: 1, startDate: date[0], endDate: date[1] });
        });
    }

    render() {
        return (
            <div id={this.skogsrum.id} className="skogsrum">
                <img className="image" alt="skogsrum" src={this.skogsrum.imgUrl} />
                <h3>{this.skogsrum.name}</h3>
                <div className="wrapper">
                    <p>{this.skogsrum.description} {renderLink(this.skogsrum.infoUrl)}</p>
                    
                    {/* <div className="number-wrapper mt-1"><input ref={(quantity) => { this.quantity = quantity }} onChange={this.quantitySelected} type="number" min="1" max="2" className="mr-1 numberbox" value="2"/><span>ANTAL PERSONER</span></div> */}
                    <div>
                        <div><span>Första natten: </span><span className="price_big">{ Math.ceil(this.skogsrum.priceFirstNight) } :- /natt</span></div>
                        <div><span>Efterföljande nätter: </span><span className="price_big">{ Math.ceil(this.skogsrum.priceSubsequentNights) } :- /natt</span></div>
                    </div>
                    <Dateselector key={this.props.date} range={true} unavailableDates={this.skogsrum.unavailableDates} dateCallback={this.dateSelected} date={this.props.date} minDate={new Date(this.skogsrum.earliest)} maxDate={new Date(this.skogsrum.latest)} />
                    <span className="small"><em>Välj ankomst- och avresedag. <br/>Grå dag går att checka ut på. </em></span>
                </div>    
            </div>
        );   
    }
}

export default Skogsrum;
