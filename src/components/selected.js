import React from 'react';
import Moment from 'react-moment';

class Selected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floated: false,
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

    handleRemove(id) {
        this.props.onBookableRemove(id);
    }
    renderDate = (date) => {
        return (<Moment format="DD MMM YYYY" key={Math.floor(Math.random() * 10)}>{date}</Moment>);
    }
    renderSelected = (selected) => {
        if(selected) {
            return (selected.map((selected) => {
                let endDate, dash;
                const startDate = this.renderDate(selected.startDate);
                if(selected.startDate !== selected.endDate) {
                    dash = " - ";
                    endDate = this.renderDate(selected.endDate);
                }
                return (
                    <li key={selected.productId}>
                    <span className="title">{selected.text}</span>
                    <span className="date"><span key={selected.productId + 1}>{startDate}</span> {dash} <span key={selected.productId + 2}>{endDate}</span></span>
                    <span className="price">{Math.ceil(selected.priceTotal)} :-</span>
                    <span className="remove"><span className="button" onClick={(id) => { this.handleRemove(selected.productId) } }>X</span></span>
                    </li>); 
            }));
        } else {
            return;
        }
    }
    renderPrice = (price) => {
        if(price) {
            return (<li colSpan="4"><em> Totalt: { Math.ceil(price) } :- </em></li>);
        }
    }
    render() {
        let floated = this.state.floated ? 'floated' : '';
        return (
            <div id="selected" className={floated}>
                <h3>Du har valt:</h3>
                <ul>
                    <li className="titles"><span>Namn</span><span>Datum</span><span>Pris</span><span>Ta bort</span></li>
                    {this.renderSelected(this.props.selectedItems.orderLines)}
                    {this.renderPrice(this.props.selectedItems.priceTotal)}
                </ul>
          </div>
        );   
    }
}

export default Selected;
