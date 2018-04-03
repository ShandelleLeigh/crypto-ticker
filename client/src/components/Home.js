import React, { Component, Fragment, Divider } from 'react';
import CoinForm from './CoinForm';
import CoinList from './CoinList';


// class Home extends Component {
//   render() {
//     return (
//         <Fragment>
//           <CoinForm />
//           <CoinList />
//         </Fragment>
//     );
//   }
// }
//
// const Home = () => {
//   <Fragment>
//     <CoinForm />
//     <CoinList />
//   </Fragment>
//
// }   <<---- this doesnt work because it doesnt like the curly brackets!! why???
/// browser said that it didn't have anything to render, or the return had nothing to render...

const Home = () => (
  <Fragment>
    <br/>
    <CoinForm />
    <CoinList />
  </Fragment>
)

//dont make home an array, because you'd need unique keys for each element,
//and commas between everything

export default Home;
