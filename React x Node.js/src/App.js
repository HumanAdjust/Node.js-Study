import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // state 초기값 설정
  state = {users: []}

  componentDidMount() {
    // 프록시로 등록한 서버주소가 생략됨
    fetch('/users')
      .then(res => res.json())
      // json형식으로 받아온 값을 setState를 이용해 값을 재설정해줌
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;