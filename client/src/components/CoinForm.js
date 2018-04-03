import React from 'react';
import { Form } from 'semantic-ui-react';
// connect needed to dispatch add coin aciton:
import { connect } from 'react-redux';
import { addCoin } from '../actions/coins.js'

class CoinForm extends React.Component {
  //state will keep value of input: which will be coin.
  state = { coin: '' }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value.toLowerCase().replace(' ', '') })
    //because thrid party api doesnt allow spaces or caps, so fix what is stored
    //as the user types^^
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //prevents browser from reloading, by prevent default on event
    const { dispatch } = this.props;
    //value that is dipsatching is from pros
    const { coin } = this.state;
    // the props comes from this.state.coin
    dispatch(addCoin(coin))
    //add coin to coin the param/object that is then dispatched.
    this.setState({ coin: '' })
    // set state of coin back to empty string, since you dont want to send duplicates,
    
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Watch Coin"
          value={this.state.coin}
          onChange={this.handleChange}
          name="coin"
          required
        />
        <Form.Button>Add Coin</Form.Button>
      </Form>
    )
  }
}

export default connect()(CoinForm);
