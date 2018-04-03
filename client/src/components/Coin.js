import React from 'react';
import { Container, Card, Grid, Header, Divider } from 'semantic-ui-react';
//call to server w/in component, and not dispatching an action, need connect,
// because, even though data is stored in state, to keep user logged in
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
// to update tokens, through middleware
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

class Coin extends React.Component {
  state = { coin: {} }

  componentDidMount() {
    const { dispatch, match: { params: { id }} } = this.props;
    // adds id to props
    // match: since it's rendered by route, match has params object of id of coin from url,
    //axios call isnt needed in redux, so it doesnt need an action, only to call data to render elements, 
    axios.get(`/api/coins/${id}`)
    .then( res => {
      dispatch(setHeaders(res.headers))
      //keeps user logged in,
      this.setState({ coin: res.data })
      //set state to response data about coin,
    })
  }

  calcPrice = (coin, price, change) => {
    let c = parseFloat(change)
    let p = parseFloat(price)
    if (c < 0)
      return p * (Math.abs((c / 100)) + 1)
    else
      return p / ((c / 100) + 1)
  }

  formatData = (coin) => {
    return [
      { time: '7 days', price: this.calcPrice(coin, coin.price_usd, coin.percent_change_7d) },
      { time: '24 hours', price: this.calcPrice(coin, coin.price_usd, coin.percent_change_24h) },
      { time: '1 hour', price: this.calcPrice(coin, coin.price_usd, coin.percent_change_1h) },
      { time: 'Current', price: parseFloat(coin.price_usd) },
    ]
  }

  render() {
    const { coin } = this.state;
    return (
      <Container>
        <Divider hidden/>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={6}>
              <Header as="h1">{coin.symbol}</Header>
              <Card>
                <Card.Content header={coin.name} />
                <Card.Content description={`$${coin.price_usd}`} />
                <Card.Content description={`${coin.price_btc} BTC`} />
                <Card.Content extra>
                  <p>Rank: {coin.rank}</p>
                  <p>Symbol: {coin.symbol}</p>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as="h1">{coin.name} Historical Data</Header>
              <AreaChart height={400} width={800} data={this.formatData(coin)}>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8884D8"
                  fill="#8884D8"
                />
              </AreaChart>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default connect()(Coin);
