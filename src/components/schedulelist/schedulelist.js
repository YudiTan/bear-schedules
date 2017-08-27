import React from 'react';
import Schedule from './schedule';
import firebase from '../../firebase.js';

class ScheduleList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      schedules: []
    }
  }

  componentWillMount(){
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        newState.push({
          id: user,
          user: users[user].user,
          major: users[user].major,
        })
      }
      this.setState({
        schedules: newState
      });
    });
  }


  render() {
    console.log(this.state.schedules);
    const allSchedules = this.state.schedules.map((p) => <Schedule key={p.id} user={p.user} major={p.major} />);
    return (
      <div>
        <main id="main">
          {allSchedules}
        </main>
      </div>
    );
  }
};

export default ScheduleList
