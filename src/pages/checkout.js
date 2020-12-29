import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    withRouter
  } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.klarnaHtmlSnippet = React.createRef();
    }
    componentDidMount() {
        if(this.props.location.state) {
            this.fetchCheckout();
        }
    }
    fetchCheckout() {
        
        let data = {
            "products": [...this.props.location.state.orderLines.map(selected => {
                const startDate = selected.startDate ? moment(selected.startDate).format("YYYY-MM-DD") : '';
                const endDate = selected.endDate ? moment(selected.endDate).format("YYYY-MM-DD") : '';
                return ({"id": selected.productId, "quantity": selected.quantity, "startDate": startDate, "endDate": endDate } )
            })]
        };
      
        data = JSON.stringify(data);
        fetch('https://api.test.naturlogi.se/api/order/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.klarnaHtmlSnippet.current.innerHTML = data.klarnaHtmlSnippet;
            const scriptsTags = this.klarnaHtmlSnippet.current.getElementsByTagName('script');
            for (let i = 0; i < scriptsTags.length; i++) {
                const parentNode = scriptsTags[i].parentNode;
                const newScriptTag = document.createElement('script');
                newScriptTag.type = 'text/javascript';
                newScriptTag.text = scriptsTags[i].text;
                parentNode.removeChild(scriptsTags[i]);
                parentNode.appendChild(newScriptTag);
            }
        });
    }
    renderKlarna(snippet) {
        return (parse(snippet));
    }
    render() {
        return (
            <div>
                <Link to="/" className="button" >Back</Link>
                <h2>Checkout</h2>
                <label htmlFor="discount">Rabattkod/Presentkort</label>
                <input name="discount" type="text"/>
                {/* <Selected selectedItems={this.state.selected} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange}></Selected> */}
                <label htmlFor="other">Övrig info</label>
                <textarea name="other" type="text"/>
                <div id="klarnaHtmlSnippet" ref={this.klarnaHtmlSnippet}>Klarna</div>
            </div>
        );
    }
}

export default withRouter(Checkout);
