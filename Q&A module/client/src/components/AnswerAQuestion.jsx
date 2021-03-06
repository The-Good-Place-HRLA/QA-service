import React from 'react';
import TermsAndConditions from './TermsAndConditions.jsx';
import moment from 'moment';
import axios from 'axios';

class AnswerAQuestion extends React.Component {
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
    this.postAnswer = this.postAnswer.bind(this);
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

  postAnswer() {
    this.setState({
      postQClicked: true,
    });
    if (this.state.formCompleted) {
    this.props.hideAnsPopup();
    this.props.answerSubmit();
      var newAns = {
        aNickname: this.state.qNickname,
        answer: this.state.answer,
        aDate: this.state.qDate,
        aEmail: this.state.qEmail,
        aLocation: this.state.qLocation,
        yes: 0,
        no: 0,
        inappropriate: '',
        newAns: 'true'
      };
      var endpoint = document.location.href.substring(22);
      var productID = Number(endpoint.split('/')[0]);
      console.log(this.props.num)
      axios
        .put(`http://localhost:8080/api/${productID}`, {num: this.props.num, newAns})
        .then(console.log('posted'))
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
      <div className='ct-ans-q-main'>
      <div id='ct-tiny-words' style={{marginBottom: -13, marginLeft: 8}}>Required fields are marked with *</div>
      <hr className='ct-hr2'/>
      <div className='ct-form'>
        <div className='ct-form-askq-q'>
          <div className='ct-ask-q-container'>
            <span id='ct-q-title' style={{fontWeight:'bold'}}>Answer*
              &nbsp;&nbsp;&nbsp;<span style={{fontWeight:'normal'}}>Maximum of 255 characters.</span>
            </span>
            { this.state.postQClicked && !this.state.questionBC &&
              <span className='ct-q-required-box'>
                <span className='ct-q-required-container'>
                  <span id='ct-req-content'>
                    Required&nbsp;<span className='ct-q-required'></span>
                  </span>
                </span>
              </span>
            }
            { this.state.question &&
              <div id='ct-check'>
                <span className='ct-q-checkmark-container'>
                  <div className='ct-checkmark-sml'>
                    <div className='ct-checkmark-sml-circle'></div>
                    <div className='ct-checkmark-sml-stem'></div>
                    <div className='ct-checkmark-sml-kick'></div>
                  </div>
                </span>
              </div>
            }
          </div>
        </div>
        <form id='ct-form'>
          <textarea className='ct-textarea' rows='4' cols='129' placeholder='Ask a question...' name='question' onChange={(e) => this.changeHandler(e)} style={{borderColor: this.state.questionBC}}></textarea>
          <hr className='ct-hr'/>
        <div className='ct-nickname-and-loc'>
          <div className='ct-nickname-form' style={{fontWeight:'bold'}}>
            <div id='ct-name-header'><span>Nickname*</span>
              { this.state.postQClicked && !this.state.qNicknameBC &&
                <span className='ct-name-required-container'>
                  <span id='ct-req-content' style={{fontWeight:'normal'}}>
                    Required&nbsp;<span className='ct-q-required'></span>
                  </span>
                </span>
              }
              { this.state.qNickname &&
                <span className='ct-q-check-container-name'>
                  <span className='ct-checkmark-sml'>
                    <div className='ct-checkmark-sml-circle'></div>
                    <div className='ct-checkmark-sml-stem'></div>
                    <div className='ct-checkmark-sml-kick'></div>
                  </span>
                </span>
              }
            </div>
            <div>
              <input className='ct-q-input' placeholder='Example: jackie27' name='qNickname' onChange={(e) => this.changeHandler(e)} style={{borderColor: this.state.qNicknameBC}}></input>
            </div>
          </div>
          <div className='ct-location-form' style={{fontWeight:'bold'}}>
            <div className='ct-loc-header'>Location
              { this.state.qLocationBC && 
              <span className='ct-q-check-container-loc'>
                <span className='ct-checkmark-sml'>
                  <div className='ct-checkmark-sml-circle'></div>
                  <div className='ct-checkmark-sml-stem'></div>
                  <div className='ct-checkmark-sml-kick'></div>
                </span>
              </span>
              }
              </div>
              <div>
                <input className='ct-q-input' placeholder='Example: Seattle, WA' name='qLocation' onChange={(e) => this.changeHandler(e)} style={{borderColor: this.state.qLocationBC}}></input>
              </div>
          </div>
        </div>
        <hr className='ct-hr'/>
          <div className='ct-email-form' style={{fontWeight:'bold'}}>
              <div id='ct-name-header'><span>Email*</span>
            { this.state.postQClicked && !this.state.qEmailBC &&
              <span className='ct-name-required-container'>
              <span id='ct-req-content' style={{fontWeight:'normal'}}>
                Required&nbsp;<span className='ct-q-required'></span>
              </span>
              </span>
            }
            { this.state.qEmail.includes('@') && this.state.qEmail.includes('.') && this.state.qEmail.includes('com') &&
              <span className='ct-q-check-container-name'>
                <span className='ct-checkmark-sml'>
                  <div className='ct-checkmark-sml-circle'></div>
                  <div className='ct-checkmark-sml-stem'></div>
                  <div className='ct-checkmark-sml-kick'></div>
                </span>
              </span>
            }
          </div>
              <div>
                <input className='ct-q-input-email' placeholder='Example: youremail@example.com' name='qEmail' onChange={(e) => this.changeHandler(e)} style={{borderColor: this.state.qEmailBC}}></input>
              </div>
            </div>
        </form>
      </div>
      <hr className='ct-hr3'/>
      <div id='ct-agree-to-tc-container'><a href='ct-agree-to-tc-container'></a>
        <input type='checkbox' style={{cursor:'pointer'}} checked={this.state.checkedTC} onChange={this.toggleCheck}/>
        <span id='ct-agree'>&nbsp;&nbsp;&nbsp;I agree to the <span id='ct-terms' onClick={() => this.showPopup()}>terms &amp; conditions</span></span>
        { this.state.postQClicked && !this.state.checkedTC &&
          <span className='ct-q-required-container-tc'>
           <span id='ct-req-content'>
            Required&nbsp;<span className='ct-q-required'></span>
           </span>
          </span>
        }
        { this.state.checkedTC &&
          <span className='ct-check-container-tc'>
            <span className='ct-checkmark-sml'>
              <div className='ct-checkmark-sml-circle'></div>
              <div className='ct-checkmark-sml-stem'></div>
              <div className='ct-checkmark-sml-kick'></div>
            </span>
          </span>
        }
      </div>
      <div id='ct-tiny-words'>&nbsp;You may receive emails regarding this submission. Any emails will include the ability to opt out of future communications.</div>
      { this.state.formCompleted ? (
        <a href='#ct-qa-container'><button className='ct-blue-btn' id='ct-submit-form' onClick={() => this.postAnswer()}>Post Answer</button></a>
      ) : (
        <button className='ct-blue-btn' id='ct-submit-form' onClick={() => this.postAnswer()}>Post Answer</button>
      ) }
      { this.state.TCPopup &&
        <TermsAndConditions checkTCHidePopup={this.checkTCHidePopup} hidePopup={this.hidePopup}/>
      }
      </div>
    );
  }
}

export default AnswerAQuestion;