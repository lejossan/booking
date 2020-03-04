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
    }
    dateSelected = (date) => {
        this.setState({
            ...this.state,
            date: date,
        }, () => {
            this.props.bookingCallback({id: this.skogsrum.id, name: this.skogsrum.name, data: this.state});
        });
    }
    quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        }, () => {
            this.props.bookingCallback({id: this.skogsrum.id, name: this.skogsrum.name, data: this.state});
        });
    }
    render() {
        return (
            <div id={"booking-" + this.skogsrum.name} className="skogsrum">
                <div className={"image image-" + this.skogsrum.image}>
                    <h3>{this.skogsrum.name}</h3>
                </div>
                <div className="wrapper">
                    <p>{this.skogsrum.info}</p>
                    <a href={"https://naturlogi.se/" + this.skogsrum.url} className="button mb-2">LÄS MER</a>
                    <div className="number-wrapper mt-1"><input onChange={this.quantitySelected} type="number" max={this.skogsrum.max} min="0" className="mr-1 numberbox" /><span>ANTAL PERSONER</span></div>
                    <span className="price">{this.skogsrum.price}:- /pers/natt</span>
                    <Dateselector dateCallback = {this.dateSelected}/>
                </div>    
            </div>
        );   
    }
}

export default Skogsrum;
