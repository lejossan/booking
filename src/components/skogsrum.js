import React from 'react';
import Dateselector from './dateselector.js';

class Skogsrum extends React.Component {
    constructor(props) {
        super(props);
        this.skogsrum = props.skogsrum;
        this.state = {
            date: {},
            quantity: 0, 
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
        }, () => {
            this.props.onChange({id: this.skogsrum.id, name: this.skogsrum.name, data: this.state});
            //this.props.bookingCallback({id: this.skogsrum.id, name: this.skogsrum.name, data: this.state});
        });
    }
    quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        }, () => {
            this.props.onChange({id: this.skogsrum.id, name: this.skogsrum.name, data: this.state});
            //this.props.bookingCallback({id: this.skogsrum.id, name: this.skogsrum.name, data: this.state});
        });
    }
    render() {
        console.log('in skogsrum: ', this.skogsrum)
        return (
            <div id={"booking-" + this.skogsrum.name} className="skogsrum">
                <img className="image" src="http://findus:7000/api/files/IMG_1258.jpg" />
                <h3>{this.skogsrum.name}</h3>
                <div className="wrapper">
                    <p>{this.skogsrum.description}</p>
                    <a href={"https://naturlogi.se/" + this.skogsrum.url} className="button mb-2">LÄS MER</a>
                    <div className="number-wrapper mt-1"><input onChange={this.quantitySelected} type="number" max={this.skogsrum.maxAmount} min="0" className="mr-1 numberbox" /><span>ANTAL PERSONER</span></div>
                    <span className="price">{this.skogsrum.price}:- /pers/natt</span>
                    <Dateselector dateCallback = {this.dateSelected}/>
                </div>    
            </div>
        );   
    }
}

export default Skogsrum;
