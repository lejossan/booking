import React from 'react';
import {
    BrowserRouter as Router, // eslint-disable-line
    Link,
    withRouter
  } from 'react-router-dom';
import moment from 'moment';
import { DateTime } from 'luxon';
import Selected from '../components/selected.js';
import i18n from '../components/i18n';

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            discount: "",
            discountMessage: " ",
            valid: "notvalid",
            approved: false,
        }
        this.klarnaHtmlSnippet = React.createRef();
        this.handleDiscountChange = this.handleDiscountChange.bind(this);
        this.verifyDiscount = this.verifyDiscount.bind(this);
        this.approvedChange = this.approvedChange.bind(this);
    }
    componentDidUpdate() {
        if(this.props.location.state && this.state.approved) {
            this.fetchCheckout();
        } else {
            this.klarnaHtmlSnippet.current.innerHTML = i18n.t('checkout.approve');
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
                return ({"id": selected.productId, "quantity": selected.quantity, "startDate": selected.startDate, "endDate": selected.endDate } )
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
    /* renderKlarna(snippet) {
        return (parse(snippet));
    } */
    handleDiscountChange(event) {
        this.setState({discount: event.target.value});
      }
/*     verifyDiscount(e) {
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
    } */
    verifyDiscount(e) {
        console.log("verify this: " + this.state.discount)
        let data = {
            "products": [...this.props.location.state.orderLines.map(selected => {
                const startDate = selected.startDate ? moment(selected.startDate).format("YYYY-MM-DD") : '';
                const endDate = selected.endDate ? moment(selected.endDate).format("YYYY-MM-DD") : '';
                return ({"id": selected.productId, "quantity": selected.quantity, "startDate": startDate, "endDate": endDate } )
            })],
            "couponCode": this.state.discount
        };

        data = JSON.stringify(data);
        fetch('https://api.test.naturlogi.se/api/order/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.id) {
                    console.log(data)
                } else {
                    console.warn(data)
                    this.setState(prevState => {
                        return { error: data.title }
                    });
                }
            });
    }
    approvedChange = () => {
        this.setState(prevState => {
            return { approved: prevState.approved === false }
        });
    }
    render() {
        return (
            <div className="checkout">
                <Link to={{ pathname: "/boka", state: this.state}} className="button" >Tillbaka</Link>
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
                <div className="approve">
                    <input type="checkbox" checked={this.state.approved} onChange={this.approvedChange}></input>
                    <label>Godkänn <a href="https://naturlogi.se/bokningsvillkor/" alt="bokningsvillkoren">bokningsvillkoren</a></label>
                </div>
                <Selected selectedItems={this.props.selectedItems} onBookableRemove={this.handleBookableRemove} onBookableChange={this.handleBookableChange}></Selected>
                <div id="klarnaHtmlSnippet" ref={this.klarnaHtmlSnippet}>{i18n.t('checkout.approve')}</div>
            </div>
        );
    }
}

export default withRouter(Checkout);
