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
        return (<Moment format="DD MMM YYYY" key={Math.floor(Math.random() * 10)}>{date}</Moment>);
    }
    renderSelected = (selected) => {
        if(selected) {
            console.log(selected)
            
            return (selected.map((selected) => {
                let endDate, dash;
                const startDate = this.renderDate(selected.startDate);
                if(selected.startDate !== selected.endDate) {
                    dash = " - ";
                    endDate = this.renderDate(selected.endDate);
                }
                return (
                    <tr key={selected.id}>
                    <td>{selected.productName}</td>
                    <td>{startDate} {dash} {endDate}</td>
                    <td><span className="button" onClick={() => { this.removeSelected(selected.id) } }>X</span></td>
                    </tr>); 
            }));
        } else {
            return;
        }
    }
    renderPrice = (price) => {
        if(price) {
            return (<td colSpan="3"><em> Totalt: { Math.ceil(price) } :- </em></td>);
        }
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
                        <tr><th>Namn</th><th>Datum</th><th>Ta bort</th></tr>
                    </thead>
                    <tbody>
                        {this.renderSelected(this.props.selectedItems.orderLines)}
                        <tr>{this.renderPrice(this.props.selectedItems.priceTotal)}</tr>
                    </tbody>
                </table>
          </div>
        );   
    }
}

export default Selected;
