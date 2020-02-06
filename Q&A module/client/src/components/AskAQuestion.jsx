import React from 'react';
import TermsAndConditions from './TermsAndConditions.jsx';
import moment from 'moment';
import axios from 'axios';

class AskAQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TCPopup: false,
      checkedTC: false,
      formCompleted: false,
      postQClicked: false,
      question: '',
      qNickname: '',
      qLocation: '',
      qEmail: '',
      qDate: '',
      questionBC: '',
      qNicknameBC: '',
      qLocationBC: '',
      qEmailBC: ''
    }
    this.showPopup = this.showPopup.bind(this);
    this.checkTCHidePopup = this.checkTCHidePopup.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.postQuestion = this.postQuestion.bind(this);
    this.setFormCompleted = this.setFormCompleted.bind(this);
  }

  showPopup() {
    this.setState({
      TCPopup: true
    });
  };

  checkTCHidePopup() {
    this.setState({
      checkedTC: true,
      TCPopup: false
    });
  };

  hidePopup() {
    this.setState({
      TCPopup: false
    });
  };

  toggleCheck() {
    this.setState({
      checkedTC: !this.state.checkedTC
    }, () => this.setFormCompleted());
  };

  changeHandler(e) {
    if (e.target.name === 'qEmail' && e.target.value.includes('@')) {
      this.setState({
        qEmail: e.target.value,
        qEmailBC: 'black'
      }, () => this.setFormCompleted())
    }
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + 'BC']: 'black',
      postQClicked: false
    }, () => this.setFormCompleted())
    if (e.target.value === '' && e.target.name !== 'qLocation' || (e.target.name === 'qEmail' && !e.target.value.includes('@'))) {
      this.setState({
        [e.target.name + 'BC']: ''
      }, () => this.setFormCompleted())
    }
  };
  componentDidMount() {
    this.getDate();
  }

  getDate() {
    var today = moment().utc().format();
    this.setState({
      qDate: today
    });
  }

  postQuestion() {
    this.setState({
      postQClicked: true,
    });
    if (this.state.formCompleted) {
      this.props.hideAskAQuestion();
      this.props.questionSubmit();
      let list = this.props.QApairs;
      let newQuestion = {
        number: list.length,
        qNickname: this.state.qNickname,
        question: this.state.question,
        qDate: this.state.qDate,
        qEmail: this.state.qEmail,
        qLocation: this.state.qLocation,
        newQ: true,
        ansCount: 0
      };
      newQuestion.answers = [{
       yes: 0,
       no: 0
      }];
      axios
        .post('/api', newQuestion)
        .then(() => this.props.getData())
        .catch((err) => console.error(err))
      document.getElementById('ct-form').reset();
      this.setState({
        question: '',
        qNickname: '',
        qLocation: '',
        qEmail: '',
        qDate: ''
      })
    }
  }

  setFormCompleted() {
    if (this.state.questionBC && this.state.qNicknameBC && this.state.qEmailBC && this.state.checkedTC) {
      this.setState({ formCompleted: true })
    } else {
      this.setState({ formCompleted: false })
    }
  }
  render() {
    return (
      <div>
        <h2 className='ct-q-and-a' id='ct-ask-q-title'>Ask a Question</h2> 
        <a href='#ct-qa-container'><span className='CTcloseAskQ' onClick={() => this.props.hideAskAQuestion()}></span></a>
        <div id='ct-tiny-words' style={{marginBottom: -13, marginLeft: 8}}>Required fields are marked with *</div>
        <hr className='ct-hr'/>
        <div className='ct-form'>
          <div><span style={{fontWeight:'bold'}}>Question*</span>
          &nbsp;&nbsp;&nbsp;<span>Maximum of 255 characters.</span>
          { this.state.postQClicked && !this.state.questionBC ? (
            <span className='ct-q-required-container'>
             <span id='ct-req-content'>
              Required&nbsp;<span className='ct-q-required'></span>
             </span>
            </span>
          ) : (<div/>)}
          { this.state.question ? (
            <span className='ct-q-check-container'>
              <span className='ct-checkmark-sml'>
                <div className='ct-checkmark-sml-circle'></div>
                <div className='ct-checkmark-sml-stem'></div>
                <div className='ct-checkmark-sml-kick'></div>
            </span>
            </span>
          ) : (<div/>) }
          </div>
          <form id='ct-form'>
          <textarea className='ct-textarea' rows='4' cols='129' placeholder='Ask a question...' name='question' onChange={(e) => this.changeHandler(e)} style={{borderColor: this.state.questionBC}}></textarea>
          <hr className='ct-hr'/>
          <div className='ct-nickname-and-loc'>
            <div className='ct-nickname-form' style={{fontWeight:'bold'}}>Nickname*
            { this.state.postQClicked && !this.state.qNicknameBC ? (
            <span className='ct-name-required-container'>
             <span id='ct-req-content' style={{fontWeight:'normal'}}>
              Required&nbsp;<span className='ct-q-required'></span>
             </span>
            </span>
          ) : (<div/>)}
            { this.state.qNickname ? (
            <span className='ct-q-check-container-name'>
              <span className='ct-checkmark-sml'>
                <div className='ct-checkmark-sml-circle'></div>
                <div className='ct-checkmark-sml-stem'></div>
                <div className='ct-checkmark-sml-kick'></div>
              </span>
            </span>
          ) : (<div/>) }
              <div>
                <input className='ct-q-input' placeholder='Example: jackie27' name='qNickname' onChange={(e) => this.changeHandler(e)} style={{borderColor: this.state.qNicknameBC}}></input>
              </div>
            </div>
            <div className='ct-location-form' style={{fontWeight:'bold'}}>Location
            { this.state.qLocationBC ? (
            <span className='ct-q-check-container-loc'>
              <span className='ct-checkmark-sml'>
                <div className='ct-checkmark-sml-circle'></div>
                <div className='ct-checkmark-sml-stem'></div>
                <div className='ct-checkmark-sml-kick'></div>
              </span>
            </span>
          ) : (<div/>) }
              <div>
                <input className='ct-q-input' placeholder='Example: Seattle, WA' name='qLocation' onChange={(e) => this.changeHandler(e)} style={{borderColor: this.state.qLocationBC}}></input>
              </div>
            </div>
          </div>
          <hr className='ct-hr'/>
          <div style={{fontWeight:'bold'}}>Email*
          { this.state.postQClicked && !this.state.qEmailBC ? (
            <span className='ct-email-required-container'>
             <span id='ct-req-content' style={{fontWeight:'normal'}}>
              Invalid email&nbsp;<span className='ct-q-required'></span>
             </span>
            </span>
          ) : (<div/>)}
          { this.state.qEmail.includes('@') ? (
            <span className='ct-q-check-container-email'>
              <span className='ct-checkmark-sml'>
                <div className='ct-checkmark-sml-circle'></div>
                <div className='ct-checkmark-sml-stem'></div>
                <div className='ct-checkmark-sml-kick'></div>
              </span>
            </span>
          ) : (<div/>) }
        </div>
          <input className='ct-q-input' placeholder='Example: youremail@example.com' name='qEmail' onChange={(e) => this.changeHandler(e)} style={{borderColor: this.state.qEmailBC}}></input>
          </form>
        </div>
        <hr className='ct-hr'/>
        <div id='ct-agree-to-tc-container'><a href='ct-agree-to-tc-container'></a>
          <input type='checkbox' style={{cursor:'pointer'}} checked={this.state.checkedTC} onChange={this.toggleCheck}/><span id='ct-agree'>&nbsp;&nbsp;&nbsp;I agree to the <a href='#ct-qa-container'><span id='ct-terms' onClick={() => this.showPopup()}>terms &amp; conditions</span></a></span>
          { this.state.postQClicked && !this.state.checkedTC ? (
            <span className='ct-q-required-container'>
             <span id='ct-req-content'>
              Required&nbsp;<span className='ct-q-required'></span>
             </span>
            </span>
          ) : (<div/>)}
          { this.state.checkedTC ? (
            <span className='ct-check-container-tc'>
              <span className='ct-checkmark-sml'>
                <div className='ct-checkmark-sml-circle'></div>
                <div className='ct-checkmark-sml-stem'></div>
                <div className='ct-checkmark-sml-kick'></div>
              </span>
            </span>
          ) : (<div/>) }
        </div>
        <div id='ct-tiny-words'>&nbsp;You may receive emails regarding this submission. Any emails will include the ability to opt out of future communications.</div>
        { this.state.formCompleted ? (
          <a href='#ct-qa-container'><button className='ct-blue-btn' id='ct-submit-form' onClick={() => this.postQuestion()}>Post question</button></a>
        ) : (
          <button className='ct-blue-btn' id='ct-submit-form' onClick={() => this.postQuestion()}>Post question</button>
        ) }
        { this.state.TCPopup ? (
          <TermsAndConditions checkTCHidePopup={this.checkTCHidePopup} hidePopup={this.hidePopup}/>
        ) : (<div/>) }
        
      </div>
    );
  }
}

export default AskAQuestion;