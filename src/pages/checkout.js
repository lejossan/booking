import React from 'react';
import {
    BrowserRouter as Router, // eslint-disable-line
    Link,
    withRouter
  } from 'react-router-dom';
import moment from 'moment';
import Selected from '../components/selected.js';
import i18n from '../components/i18n';
import Toast from '../components/toast';

const apiBase = process.env.API_BASE;

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showWarning: false,
        }
        this.klarnaHtmlSnippet = React.createRef();
        this.closeToast = this.closeToast.bind(this);
    }
    componentDidMount() {
        if(this.props.location.state) {
            this.fetchCheckout();
        } else {
            this.klarnaHtmlSnippet.current.innerHTML = i18n.t('toast.warning.general');
        }
    }

    fetchCheckout() {
        let data = {
            "id": this.props.location.state.id,
            "couponCode": this.props.location.state.couponCode,
            "notes": this.props.location.state.notes,
            "products": [...this.props.location.state.orderLines.map(selected => {
                return ({"productId": selected.productId, "quantity": selected.quantity, "startDate": selected.startDate, "endDate": selected.endDate != null ? selected.endDate : selected.startDate } )
            })]
        };
        
        //strip product list form coupon codes
        data.products = [...data.products.filter(n => n.productId)];
        data = JSON.stringify(data);

        fetch(apiBase + 'order/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.klarnaHtmlSnippet) {
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
            } else {
                console.warn(data)
                this.setState(prevState => {
                    return { ...prevState, warningText: i18n.t('toast.warning.klarna'), showWarning: true }
                });
            }
        });
    }
    closeToast() {
        this.setState(prevState => {
            return { ...prevState, showInfo: false, showWarning: false }
        });
    }

    render() {
        return (
            <div className="checkout">
                <Link to={{ pathname: "/extras", state: this.state}} className="button" >Tillbaka</Link>
                <h3>Steg 3 av 3</h3>
                
                <Selected selectedItems={this.props.selectedItems} readOnly={true} ></Selected>
                
                <div id="klarnaHtmlSnippet" ref={this.klarnaHtmlSnippet}></div>
                <Toast show={this.state.showWarning} type="warning" text={this.state.warningText} onClose={this.closeToast} />
            </div>
        );
    }
}

export default withRouter(Checkout);
