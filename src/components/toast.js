import React, { Component } from 'react';
import i18n from '../components/i18n';
import ToastB from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    render() {
        let text = this.props.text;
        if(this.props.type == 'info' && this.props.selectedItems && this.props.selectedItems.orderLines && this.props.selectedItems.orderLines.length > 0) {
            text = 'Du har valt: ';
            text += this.props.selectedItems.orderLines.map(items => ' ' + items.text);
            text += '. ' + i18n.t('toast.down');
        }
        return (
            <ToastB onClose={() => this.props.onClose() } className={"fade " + this.props.type} show={this.props.show} delay={6000} autohide >
                <ToastHeader>
                    <strong className="mr-auto">{text}</strong>
                </ToastHeader>
                <ToastB.Body></ToastB.Body>
            </ToastB>
        );
    }
}

export default Toast;