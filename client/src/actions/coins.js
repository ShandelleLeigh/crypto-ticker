// import axios from 'axios';
// // needs to be able to communicate with server^^ so we need axios
//
// export const COINS = 'COINS';
// export const ADD_COIN = 'ADD_COINS';
// export const REMOVE_COIN = 'REMOVE_COINS';
//
// // dispatch(getCoins())  //cant dispatch asyncronous, can only:
// //dispatch({ type: 'TEST', payload: 'hello'})
// export const getCoins = () => {
//   //This is a thunk:
//   return (dispatch) => {
//     axios.get('/api/coins')
//       .then( ({ data, headers }) =>
//         dispatch({ type: COINS, coins, headers })
//         //or    response.data = coins, coins: coins, headers: headers, but it makes it not a string, and removes property????
//     )
//   }
// }
//
// export const addCoin = (coin) => {
//   return (dispatch) => {
//     axios.post('/api/coins', { coin })
//       .then( ({ data, headers }) =>
//         dispatch({ type: ADD_COIN, coin, headers }) )
//   }
// }
//
// export const removeCoin = (id) => {
//   return (dispatch) => {
//     axios.put(`/api/coins/${id}`)
//       .then( ({ headers }) =>
//         dispatch({ type: REMOVE_COIN, id, headers }) )
//   }
// }
//
// //all this will be passed to reducer, you need to remember params, and stuff that will be needed for reducers.


import axios from 'axios';
export const COINS = 'COINS';
export const ADD_COIN = 'ADD_COIN';
export const REMOVE_COIN = 'REMOVE_COIN';

export const addCoin = (coin) => {
  return (dispatch) => {
    axios.post('/api/coins', { coin })
      .then( ({ data, headers }) => dispatch({ type: ADD_COIN, coin: data, headers }) )
  }
}

export const getCoins = () => {
  return (dispatch) => {
    axios.get('/api/coins')
      .then( ({ data, headers }) => dispatch({ type: COINS, coins: data, headers }) )
  }
}

export const removeCoin = (id) => {
  return (dispatch) => {
    axios.put(`/api/coins/${id}`)
      .then( ({ headers }) => dispatch({ type: REMOVE_COIN, id, headers }) )
  }
}
