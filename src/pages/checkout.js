import React from 'react';
import {
    BrowserRouter as Router, // eslint-disable-line
    Link,
    withRouter
  } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import Selected from '../components/selected.js';

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            discount: "",
            discountMessage: " ",
            valid: "notvalid",
        }
        this.klarnaHtmlSnippet = React.createRef();
        this.handleDiscountChange = this.handleDiscountChange.bind(this);
        this.verifyDiscount = this.verifyDiscount.bind(this);
    }
    componentDidMount() {
        if(this.props.location.state) {
            this.fetchCheckout();
        }
    }
    handleBookableChange(data) {
        this.props.onBookableChange(data);
    }
    handleBookableRemove(data) {
        this.props.onBookableRemove(data);
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
    handleDiscountChange(event) {
        this.setState({discount: event.target.value});
      }
    verifyDiscount(e) {
        console.log("verify this: " + this.state.discount)
        if(this.state.discount === 'valid') {
            this.setState({
                discountMessage: "Verifierad",
                valid: "valid",
            });
        } else {
            this.setState({
                discountMessage: "Ej giltig",
                valid: "notvalid",
            });
        }
    }
    render() {
        return (
            <div className="checkout">
                <Link to="/boka" className="button" >Back</Link>
                {/* <h2>Checkout</h2> */}
                
                <div className="extraInfo">
                    <label htmlFor="other">Övrig info</label>
                    <textarea name="other" type="text" placeholder="Ange eventuella matpreferenser eller andra önskemål när det gäller din bokning."/>

                    <label htmlFor="discount">Rabattkod/Presentkort</label>
                    <input name="discount" type="text" value={this.state.discount} onChange={this.handleDiscountChange}/>
                    <div>
                        <span className={this.state.valid}>{this.state.discountMessage}</span>
                        <button className="verifyDiscount button" onClick={this.verifyDiscount} >Verifiera</button>
                    </div>
                </div>
                <Selected selectedItems={this.props.selectedItems} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange}></Selected>
                <div id="klarnaHtmlSnippet" ref={this.klarnaHtmlSnippet}>Klarna</div>
            </div>
        );
    }
}

export default withRouter(Checkout);
