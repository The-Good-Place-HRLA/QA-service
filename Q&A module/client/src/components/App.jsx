import React from 'react';
import QAList from './QAList.jsx';
import axios from 'axios';
import AskAQuestion from './AskAQuestion.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QApairs: [],
      showAskQ: false,
      submitQuestion: false,
      submitAnswer: false,
      currentSelection: 'Most helpful answers'
    }
    this.showAskAQuestion = this.showAskAQuestion.bind(this);
    this.hideAskAQuestion = this.hideAskAQuestion.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
    this.closeSubmitQPopup = this.closeSubmitQPopup.bind(this);
    this.getData = this.getData.bind(this);
    this.answerSubmit = this.answerSubmit.bind(this);
    this.clickSelection = this.clickSelection.bind(this);
  }

  componentDidMount() {
    var endpoint = document.location.href.substring(22);
    var productID = Number(endpoint.split('/')[0]);
    this.getData(productID);
  };

  getData(productID) {
    axios
      .get(`http://localhost:8080/api/1`)
      .then((result) => this.setState({ QApairs: result.data[0].QApairs }))
      .catch((err) => console.error(err));
  };

  showAskAQuestion() {
    this.setState({
      showAskQ: true
    });
  }

  hideAskAQuestion() {
    this.setState({
      showAskQ: false
    });
  }

  questionSubmit() {
    this.setState({ submitQuestion: true });
  }

  answerSubmit() {
    this.setState({ submitAnswer: true });
  }

  closeSubmitQPopup() {
    this.setState({ submitQuestion: false });
  }

  closeSubmitAPopup() {
    this.setState({ submitAnswer: false });
  }

  clickSelection(e) {
    var endpoint = document.location.href.substring(22);
    var productID = Number(endpoint.split('/')[0]);
    var selected = e.target.getAttribute('name');
    this.setState({ currentSelection: e.target.textContent});
    axios
      .post('http://localhost:8080/api/sort', { sort: selected, productID: productID })
      .then((result) => this.setState({ QApairs: result.data[0].QApairs }))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div id='ct-qa-container'><a href='ct-qa-container'></a>
        <h2 className='ct-q-and-a'>Questions &amp; Answers</h2>
        <div className='ct-blue-btn-container'><a href='#ct-ask-q-form'><button className='ct-blue-btn' id='ct-ask-q-btn' onClick={() => this.showAskAQuestion()}>Ask a question</button></a></div>
        <div className='ct-qa-block'>
          <div id='ct-qa-total'>
            <span className='ct-num-of-q'>1 &ndash; {this.state.QApairs.length} of {this.state.QApairs.length} Questions</span>
            <span className='ct-sortby'>Sort by:&nbsp;
              <button className='ct-dropdown-btn'>{this.state.currentSelection}</button>&nbsp;&#9662;
              <div className='ct-dropdown-selection'>
                <div name='newestQ' onClick={(e) => this.clickSelection(e)}>Newest questions</div>
                <div name='newestAns' onClick={(e) => this.clickSelection(e)}>Newest answers</div>
                <div name='mostAns' onClick={(e) => this.clickSelection(e)}>Most answered</div>
                <div name='ansNeeded' onClick={(e) => this.clickSelection(e)}>Answers needed</div>
                <div name='mostHelpful' onClick={(e) => this.clickSelection(e)}>Most helpful answers</div>
              </div>
            </span>
          </div>
          { this.state.QApairs.length && 
          <QAList QApairs={this.state.QApairs} answerSubmit={this.answerSubmit} currentSelection={this.currentSelection}/>
          }
        </div>
        <div id='ct-ask-q-form'><a href='ct-ask-q-form'></a>
          { this.state.showAskQ ? (<AskAQuestion  QApairs={this.state.QApairs} hideAskAQuestion={this.hideAskAQuestion} questionSubmit={this.questionSubmit} getData={this.getData}/> ) : (<div/>) }
        </div>
        { this.state.submitQuestion &&
          <div className='ct-popup'>
            <div id='ct-page-mask'></div>
            <div className='ct-popup-submit'>
              <span className='ct-close-submit-popup' onClick={() => this.closeSubmitQPopup()}></span>
              <span className='ct-checkmark'>
                <div className='ct-checkmark-circle'></div>
                <div className='ct-checkmark-stem'></div>
                <div className='ct-checkmark-kick'></div>
              </span>
              <div className='ct-submit-box'></div>
              <h2 id='ct-submit-msg'>Your question was submitted!</h2>
            </div>
          </div>
        }
         { this.state.submitAnswer &&
          <div>
            <div id='ct-page-mask'></div>
            <div className='ct-popup-submit'>
              <span className='ct-close-submit-popup' onClick={() => this.closeSubmitAPopup()}></span>
              <span className='ct-checkmark'>
                <div className='ct-checkmark-circle'></div>
                <div className='ct-checkmark-stem'></div>
                <div className='ct-checkmark-kick'></div>
              </span>
              <div className='ct-submit-box'></div>
              <h2 id='ct-submit-msg'>Your answer was submitted!</h2>
            </div>
          </div>
        }
      </div>
    );
  };
};

export default App;