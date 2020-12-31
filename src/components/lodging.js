import React from 'react';
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
            this.props.onChange({productId: this.skogsrum.id, productName: this.skogsrum.name, quantity: 1, startDate: date[0], endDate: date[1] });
        });
    }
/*     quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        }, () => {
            this.props.onChange({productId: this.skogsrum.id, productName: this.skogsrum.name, quantity: quantity, startDate: this.state.startDate, endDate: this.state.endDate });
        });
    } */
    render() {
        return (
            <div id={this.skogsrum.id} className="skogsrum">
                <img className="image" alt="skogsrum" src={this.skogsrum.imgUrl} />
                <h3>{this.skogsrum.name}</h3>
                <div className="wrapper">
                    <p>{this.skogsrum.description}</p>
                    <a href={"https://naturlogi.se/" + this.skogsrum.url} className="button mb-2">LÄS MER</a>
                    {/* <div className="number-wrapper mt-1"><input ref={(quantity) => { this.quantity = quantity }} onChange={this.quantitySelected} type="number" min="1" max="2" className="mr-1 numberbox" value="2"/><span>ANTAL PERSONER</span></div> */}
                    <div><span>Första natten: </span><span className="price">{ Math.ceil(this.skogsrum.priceFirstNight) } :- /natt</span></div>
                    <div><span>Efterföljande nätter: </span><span className="price">{ Math.ceil(this.skogsrum.priceSubsequentNights) } :- /natt</span></div>
                    <Dateselector range="true" dateCallback = {this.dateSelected} minDate={new Date(this.skogsrum.earliest)} maxDate={new Date(this.skogsrum.latest)} />
                </div>    
            </div>
        );   
    }
}

export default Skogsrum;
