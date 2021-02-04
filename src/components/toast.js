import React, { Component } from 'react';
import i18n from '../components/i18n';

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: "hidden",
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.show !== nextProps.show) {
          return { show: nextProps.show };
        }
        return null;
    }
    handleScroll(e) {
        
        /* this.setState(prevState => {
            return {...prevState, show: 'hidden' }
        }); */

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            // remove toast
        }
    }
    showToast() {
        
    }
    getText = () => {
        let text = "";
        switch (this.props.text) {
            case "Start date cannot be in the past":
                text = i18n.t('toast.error.date');
                break;
            case "down":
                text = i18n.t('toast.down');
                break;
            default:
                text = i18n.t('toast.error.general');
                break;
        }
        return ( text );
    }
    render() {
        return (
            <div className={"toast " + this.props.type + " " + this.state.show}><a href="#selected"><span>{this.getText()}</span> </a></div>
        );
    }
}

export default Toast;