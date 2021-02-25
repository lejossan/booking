import React from 'react';
import Moment from 'react-moment';

class Selected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floated: false
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleScroll(e) {
        if (this.state.floated && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
            this.setState(prevState => {
                return { ...prevState, floated: false }
            });
        }
        let windowScrollCount = window.scrollY;
        if (!this.state.floated && windowScrollCount % 10 === 0) {    
            if ((window.innerHeight + window.scrollY) <= document.body.offsetHeight - 400) {
                this.setState(prevState => {
                    return { ...prevState, floated: true }
                });
            }
        }
    }

    handleRemove(id, date) {
        this.props.onBookableRemove(id, date);
    }
    handleClose() {
        this.setState(prevState => {
            return { ...prevState, floated: false }
        });
    }
    renderDate = (date) => {
        return (<Moment format="DD MMM YYYY" key={Math.floor(Math.random() * 9999)}>{date}</Moment>);
    }
    renderSelected = (selected) => {
        if('orderLines' in selected) {
            return (selected.orderLines.map((selected) => {
                let startDate, endDate, dash, remove, discount = '';
                if(selected.startDate !== null) {
                    startDate = this.renderDate(selected.startDate);
                    if(selected.startDate !== selected.endDate && selected.endDate != null ) {
                        dash = " - ";
                        endDate = this.renderDate(selected.endDate);
                    }
                }
                if(!this.props.readOnly) {
                    remove = (<span className="remove"><span className="button" onClick={(id) => { this.handleRemove(selected.productId, selected.startDate) } }>x</span></span>);
                }
                if(selected.productId === null) {
                    discount = "discount";
                }
                return (
                    <li key={Math.floor(Math.random() * 9999)} className={discount}>
                    <span className="text">{selected.text}</span>
                    <span className="date"><span key={Math.floor(Math.random() * 9999)}>{startDate}</span> {dash} <span key={Math.floor(Math.random() * 10)}>{endDate}</span></span>
                    <span className="price">{Math.ceil(selected.priceTotal)} :-</span>
                    {remove}
                    </li>); 
            }));
        } else {
            return;
        }
    }
    renderDiscount() {

        const hasDiscount = this.props.selectedItems.orderLines.reduce(function(firstLine, secondLine) {
            return firstLine + Math.ceil(secondLine.discount);
        }, 0);
        if(hasDiscount < 0) {
            return (<span className='discount'>Rabatt: {hasDiscount}:-</span>);
        }
    }
    renderPrice = (selectedItems) => {
        if(selectedItems) {
            const total = selectedItems.priceTotal ? Math.ceil(selectedItems.priceTotal) : 0;
            return (<li className="mt-1">Totalt: { total } :-</li>);
        }
    }
    render() {
        let floated = this.state.floated ? 'floated' : '';
        const remove = this.props.readOnly ? '' : (<span className="remove">Ta bort</span>); 
        return (
            <div id="selected" className={"mt-2 mb-2 " + floated}>
                <h3 id="selected">Du har valt:</h3><span className="close" onClick={this.handleClose}>X</span>
                <ul>
                    {/* <li className="titles"><span>Namn</span><span>Datum</span><span className="price">Pris</span>{remove}</li> */}
                    {this.renderSelected(this.props.selectedItems)}
                    {this.renderDiscount()}
                    {this.renderPrice(this.props.selectedItems)}
                </ul>
          </div>
        );   
    }
}

export default Selected;
