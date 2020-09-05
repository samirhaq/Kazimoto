import React, { Component } from 'react'
import PropTypes from 'prop-types'
import emailjs from 'emailjs-com';
import { Message } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      errorMessage: false
    };
    // This binding is necessary to make `this` work in the callback
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage = (e) =>{
    e.preventDefault();

    var templateParams = {
      name: this.name.value,
      email: this.email.value,
      messageInput: this.messageInput.value
    }
    emailjs.send('service_bk2mycr', 'template_5mvucmx', templateParams, 'user_EudIibyWj7wecLuBxZVAo')
    .then(function(response) {
      console.log('SUCCESS!');
    }, function(error) {
      console.log('FAIL!:', error);
    });
    this.setState({showMessage: true, error: false});
  }

  render() {
    return (
        <div>
      <div id="contact">
  <div className="container">
    <div className="col-md-8">
      <div className="row">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Please fill out the form below to send us an email and we will get back to you as soon as possible.</p>
        </div>
        <form name="sentMessage" id="contactForm" noValidate>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" id="name" className="form-control" placeholder="Name" required="required" ref={(input) => this.name = input}/>
                <p className="help-block text-danger"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="email" id="email" className="form-control" placeholder="Email" required="required" ref={(input) => this.email = input}/>
                <p className="help-block text-danger"></p>
              </div>
            </div>
          </div>
          <div className="form-group">
            <textarea name="message" id="message" className="form-control" rows="4" placeholder="Message" ref={(input) => this.messageInput = input} required></textarea>
            <p className="help-block text-danger"></p>
          </div>
          <div id="success"></div>
          <button className="btn btn-custom btn-lg" onClick={this.submitMessage}>Send Message</button>
        </form>
        {this.state.showMessage && !this.state.error &&
        <Message
            positive
            header="The message was sent!"
          />
        }
        {this.state.showMessage && this.state.error &&
        <Message
            negative
            header="The message did not send"
            content="Something went wrong. Please Try Again"
          />
        }
      </div>
    </div>
    <div className="col-md-3 col-md-offset-1 contact-info">
      <div className="contact-item">
        <h3>Contact Info</h3>
      </div>
      <div className="contact-item">
        <p><span><i className="fa fa-phone"></i> Phone</span> {this.props.data ? this.props.data.phone : 'loading'}</p>
      </div>
      <div className="contact-item">
        <p><span><i className="fa fa-envelope-o"></i> Email</span> {this.props.data ? this.props.data.email : 'loading'}</p>
      </div>
    </div>
    <div className="col-md-12">
      <div className="row">
        <div className="social">
          <ul>
            <li><a href={this.props.data ? this.props.data.facebook : '/'}><i className="fa fa-facebook"></i></a></li>
            <li><a href={this.props.data ? this.props.data.twitter : '/'}><i className="fa fa-twitter"></i></a></li>
            <li><a href={this.props.data ? this.props.data.youtube : '/'}><i className="fa fa-youtube"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<div id="footer">
  <div className="container text-center">
    <p>&copy; 2020 Kazimoto Clean Car Products Inc. Design by <a href="http://www.samirhaq.com" rel="nofollow">Samir Haq</a></p>
  </div>
</div>  
      </div>
    )
  }
}

export default Contact
