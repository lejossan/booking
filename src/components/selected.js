import React from 'react';
import Moment from 'react-moment';

class Selected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floated: true,
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        if (this.state.floated && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
            this.setState({floated: false});
        }
        let windowScrollCount = window.scrollY;
        if (!this.state.floated && windowScrollCount % 10 === 0) {    
            if ((window.innerHeight + window.scrollY) <= document.body.offsetHeight - 400) {
                this.setState({floated: true});
            }
        }
    }

    handleRemove(id, date) {
        this.props.onBookableRemove(id, date);
    }
    renderDate = (date) => {
        return (<Moment format="DD MMM YYYY" key={Math.floor(Math.random() * 9999)}>{date}</Moment>);
    }
    renderSelected = (selected) => {
        if('orderLines' in selected) {
            return (selected.orderLines.map((selected) => {
                let endDate, dash;
                const startDate = this.renderDate(selected.startDate);
                if(selected.startDate !== selected.endDate && selected.endDate != null ) {
                    dash = " - ";
                    endDate = this.renderDate(selected.endDate);
                }
                return (
                    <li key={Math.floor(Math.random() * 9999)}>
                    <span className="text">{selected.text}</span>
                    <span className="date"><span key={Math.floor(Math.random() * 9999)}>{startDate}</span> {dash} <span key={Math.floor(Math.random() * 10)}>{endDate}</span></span>
                    <span className="price">{Math.ceil(selected.priceTotal)} :-</span>
                    <span className="remove"><span className="button" onClick={(id) => { this.handleRemove(selected.productId, selected.startDate) } }>x</span></span>
                    </li>); 
            }));
        } else {
            return;
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
        return (
            <div id="selected" className={"mt-2 mb-2" + floated}>
                <h3 id="selected">Du har valt:</h3>
                <ul>
                    <li className="titles"><span>Namn</span><span>Datum</span><span className="price">Pris</span><span className="remove">Ta bort</span></li>
                    {this.renderSelected(this.props.selectedItems)}
                    {this.renderPrice(this.props.selectedItems)}
                </ul>
          </div>
        );   
    }
}

export default Selected;
