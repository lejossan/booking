import React from 'react';
import Dateselector from './dateselector.js';

class Camp extends React.Component {
    constructor(props) {
        super(props);
        this.camp = props.camp;
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
            this.props.onChange({productId: this.camp.id, productName: this.camp.name, quantity: 1, startDate: date[0], endDate: date[1] });
        });
    }
    quantitySelected = event => {
        const quantity = event.target.value;
        this.setState({
            ...this.state,
            quantity: quantity,
        }, () => {
            this.props.onChange({productId: this.camp.id, productName: this.camp.name, quantity: quantity, startDate: this.state.startDate, endDate: this.state.endDate });
        });
    }
    renderLink = (url) => {
        if(url) {
            return (<a href={url} className="button mb-2">LÄS MER</a>);
        }
    }
    render() {
        return (
            <div id={this.camp.id} className="skogsrum">
                <img className="image" alt="skogsrum" src={this.camp.imgUrl} />
                <h3>{this.camp.name}</h3>
                <div className="wrapper">
                    <p>{this.camp.description}</p>
                    {this.renderLink(this.camp.infoUrl)}
                    <div className="number-wrapper mt-1"><input ref={(quantity) => { this.quantity = quantity }} onChange={this.quantitySelected} type="number" min="1" max="2" className="mr-1 numberbox" value="2"/><span>ANTAL PERSONER</span></div>
                    <div><span>Pris 1 person: </span><span className="price">{ Math.ceil(this.camp.priceFirstNight) } :- /natt</span></div>
                    <div><span>Extra person: </span><span className="price">{ Math.ceil(this.camp.priceSubsequentNights) } :- /natt</span></div>
                    <Dateselector key={this.props.date} range="true" dateCallback = {this.dateSelected} date={this.props.date} minDate={new Date(this.camp.earliest)} maxDate={new Date(this.camp.latest)} />
                </div>    
            </div>
        );   
    }
}

export default Camp;
