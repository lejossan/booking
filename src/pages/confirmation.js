import React from 'react';
import { withRouter } from "react-router-dom";
import {
    FacebookShareButton, 
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";

const apiBase = process.env.API_BASE;

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
        localStorage.removeItem('selectedItems');
        localStorage.removeItem('lodgingDates');
        this.getConfirmation();
    }
    getConfirmation() {
        fetch(apiBase + 'order/confirmation/' + this.orderId)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // gör en koll om det är klarnas snippet elr vårt eget vi ska visa
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
            <div>
                <div id="klarnaHtmlSnippet" ref={this.klarnaHtmlSnippet} />
                <h3>Inför ditt besök</h3>
                <p>Du hittar mer info om bokningen, packlista mm här: <a href="https://naturlogi.se/information" alt="Inför ditt besök">Inför ditt besök</a></p>
                <p>Vill du komma i kontakt med oss går det bra att maila på <a href="mailto:info@verklighetensgard.se" alt="info@verklighetensgard.se">info@verklighetensgard.se</a></p>
                <h3>Berätta om naturlogi</h3>
                <FacebookShareButton 
                    url={"http://www.naturlogi.se"}
                    quote={"Naturlogi - Din plats i skogen"}
                    hashtag="#naturlogi"
                    className="socialMediaButton mr-2">
                    <FacebookIcon size={36} />
                </FacebookShareButton>
                <TwitterShareButton
                    url={"http://www.naturlogi.se"}
                    title={"Naturlogi - Din plats i skogen"}
                    hashtag="#naturlogi"
                    className="socialMediaButton mr-2"
                >
                    <TwitterIcon size={36} />
                </TwitterShareButton>
                <WhatsappShareButton
                    url={"http://www.naturlogi.se"}
                    title={"Naturlogi - Din plats i skogen"}
                    separator=":: "
                    className="socialMediaButton"
                >
                    <WhatsappIcon size={36} />
                </WhatsappShareButton>
            </div>
        );
    }
}

export default withRouter(Complete);
