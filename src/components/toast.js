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
        return (
            <ToastB onClose={() => this.props.onClose() } className={this.props.type} show={this.props.show} delay={6000} autohide >
                <ToastHeader>
                    <strong className="mr-auto">{this.props.text}</strong>
                </ToastHeader>
                <ToastB.Body></ToastB.Body>
            </ToastB>
        );
    }
}

export default Toast;