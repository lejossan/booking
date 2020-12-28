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

    handleRemove(e) {
        this.props.onBookableRemove(e);
    }
    renderDate = (date) => {
        const dateToFormat = date.getTime();
        return (<Moment format="DD MMM YYYY" key={dateToFormat}>{dateToFormat}</Moment>);
    }
    renderSelected = (selected) => {
        if(selected.length > 0 && Object.keys(selected[0]).length !== 0) {
            return (selected.map((skogsrum) => {
                const dates = Object.keys(skogsrum.data.date).length > 1 ? skogsrum.data.date.map((date) => {
                    return this.renderDate(date);
                }) : 'Välj datum!';
                
                return (
                    <tr key={skogsrum.id}>
                    <td>{skogsrum.name}</td>
                    <td className="dates">{dates}</td>
                    <td>{skogsrum.data.quantity}</td>
                    <td><span className="button" onClick={() => { this.removeSelected(skogsrum.id) } }>X</span></td>
                    </tr>); 
            }));
        } else {
            return;
        }
    }
    renderPrice = (price) => {
        return (<td colSpan="4"><em> Totalt: { Math.ceil(price) } :- </em></td>);
    }
    removeSelected = (id) => {
        console.log("removeselected: ")
        const itemToBeRemoved = {id:id}
        let selectedItems = this.props.selectedItems;
        selectedItems.splice(selectedItems.findIndex(a => a.id === itemToBeRemoved.id) , 1);
        
        
        this.handleRemove({ "remove": id });
      }
    render() {
        let floated = this.state.floated ? 'floated' : '';
        return (
            <div id="selected" className={floated}>
                <h3>Du har valt:</h3>
                <table>
                    <thead>
                        <tr><th>Namn</th><th>Datum</th><th>Antal</th><th>Ta bort</th></tr>
                    </thead>
                    <tbody>
                        {this.renderSelected(this.props.selectedItems)}
                        <tr>{this.renderPrice(this.props.priceTotal)}</tr>
                    </tbody>
                </table>
          </div>
        );   
    }
}

export default Selected;
