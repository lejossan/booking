import React from 'react';
import { withRouter } from "react-router-dom";

class Complete extends React.Component {
    constructor(props) {
        super(props)
        this.orderId = "";
        this.klarnaHtmlSnippet = React.createRef();
    }
    componentDidMount() {
        if(this.props.location.pathname) {
            this.orderId = this.props.location.pathname.split("/confirmation/")[1];
        }
        this.getConfirmation();
    }
    getConfirmation() {
        fetch('https://api.test.naturlogi.se/api/order/confirmation/' + this.orderId)
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
    render () {
        return (
            <div id="klarnaHtmlSnippet" ref={this.klarnaHtmlSnippet}>Klarna</div>
        );
    }
}

export default withRouter(Complete);
