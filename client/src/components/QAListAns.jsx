import React from 'react';
import moment from 'moment';
import tz from 'moment-timezone';


class QAListAns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yes: this.props.firstAns.yes,
      no: this.props.firstAns.no,
      upVoted: false,
      reported: false
    }
    this.upVote = this.upVote.bind(this);
    this.reported = this.reported.bind(this);
  }

  upVote(e) {
    this.setState({
      [e.target.getAttribute('name')]: this.state[e.target.getAttribute('name')] + 1,
      upVoted: true
    })
  }

  reported() {
    this.setState({
      reported: true
    })
  }

  render() {
    return (
      <div>
        <span className='ct-ans-list-nickname'>{this.props.firstAns.aNickname}&nbsp;</span>
        <span>·</span>&nbsp;<span id='ct-small-font'>{moment.tz(this.props.firstAns.aDate, 'America/Los_Angeles').fromNow()}</span>
        <div className='ct-answer'>{this.props.firstAns.answer}</div>
        <div className='ct-if-helpful' id='ct-small-font'>Helpful?&nbsp;&nbsp;
          { this.state.upVoted ? (
            <span>
              <span className='ct-helpful-clicked' name='yes'>Yes&nbsp;·&nbsp;<span style={{color:'green'}}>{this.state.yes}</span></span>&nbsp;
              <span className='ct-helpful-clicked' name='no'>No&nbsp;·&nbsp;<span style={{color:'red'}}>{this.state.no}</span></span>&nbsp;
            </span>
          ) : (
            <span>
              <span onClick={(e) => this.upVote(e)} name='yes' className='ct-helpful'>Yes&nbsp;·&nbsp;{this.state.yes}</span>&nbsp;
              <span onClick={(e) => this.upVote(e)} name='no' className='ct-helpful'>No&nbsp;·&nbsp;{this.state.no}</span>&nbsp;
            </span>
          ) }
          { this.state.reported ? (
            <span className='ct-reported'>Reported</span>
          ) : (
            <span onClick={() => this.reported()} className='ct-inappropriate'>Report as inappropriate</span>
          ) }
        </div>        
      </div>
    )
  }
}

export default QAListAns;