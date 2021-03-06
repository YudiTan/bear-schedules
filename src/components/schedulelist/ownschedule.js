import React from 'react';
import { Link } from 'react-router-dom';
import firebase, {auth} from '../../firebase.js';
import Schedule from './schedule';


class OwnSchedule extends React.Component{

  constructor(){
    super();
    this.state = {
      userObject: '',
      user: '',
      major: '',
      school: '',
    }
  }

  componentDidMount(){
     auth.onAuthStateChanged((user) => {
      if(user){
        this.setState({userObject: user});
        let usersRef = firebase.database().ref("users");
        usersRef.orderByChild("user").equalTo(user.email).on('value', (snapshot) => {
          let users = snapshot.val();
          for (let user in users) {
            this.setState({
              user: users[user].user,
              major: users[user].major,
              school: users[user].school
            })
        }
      });
      }
    })
  }

  render(){ //because this is asynchronous and because react auto rerenders changed states, we need to set this conditional
    //such that before the data is loaded, we show a default text, and when data is loaded, we rerender with the data passed as props into the Schedule component.
    if(this.state.user !== '' && this.state.major !== '' && this.state.school !== ''){
      return (
        <div>
        <h3>Logged in as: {this.state.userObject.displayName}</h3>
        <h4>Email: {this.state.user}</h4>
        <Schedule user={this.state.user} major={this.state.major} school={this.state.school} />
        </div>
      )
    } else {
      return (
        <div>
        <h3>Logged in as: {this.state.userObject.displayName} </h3>
        <h4>Email: {this.state.userObject.email} </h4>
        <p>Please create a <Link to="/createschedule"><u>schedule</u></Link> first!</p>
        </div>
      )
    }

    }
  }


export default OwnSchedule;
