import React from 'react';
import './App.css';

function UnknownGameStateError(props) {
  return (
    <span>{"Unknown game state '" + props.gameState + "'"}</span>
  );
}

class ErrorScreen extends React.Component {
  render() {
    return (
      <div>
        <h1>Error</h1>
        <p>
          {this.props.children}
        </p>
      </div>
    );
  }
}

class CreateGameScreen extends React.Component {
  render() {
    return (
      <form>
        <div class="form-group">
          <label for="minimumWordsPerPlayer">Minimum words per player</label>
          <input type="text" class="form-control" id="minimumWordsPerPlayer" placeholder="3" />
        </div>
        <div class="form-group">
          <label for="secondsPerTurnRoundOne">Seconds per turn (round 1)</label>
          <input type="text" class="form-control" id="secondsPerTurnRoundOne" placeholder="30" />
        </div>
        <div class="form-group">
          <label for="secondsPerTurnRoundTwo">Seconds per turn (round 2)</label>
          <input type="text" class="form-control" id="secondsPerTurnRoundTwo" placeholder="30" />
        </div>
        <div class="form-group">
          <label for="secondsPerTurnRoundThree">Seconds per turn (round 3)</label>
          <input type="text" class="form-control" id="secondsPerTurnRoundThree" placeholder="60" />
        </div>
      </form>
    );
  }
}

class WaitForAdminScreen extends React.Component {
  render() {
    return (
      <div>Waiting for admin…</div>
    );
  }
}

class ScreenPicker extends React.Component {
  render() {
    switch(this.props.gameState) {
    case "CREATING":
      switch(this.props.userRole) {
      case "admin":
        return <CreateGameScreen />;
      default:
        return <WaitForAdminScreen />;
      }
    default:
      return (
        <ErrorScreen>
          <UnknownGameStateError gameState={this.props.gameState} />
        </ErrorScreen>
      );
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: "CREATING",
      userRole: "admin",
    };
  }

  render() {
    return (
      <div className="App">
        <ScreenPicker userRole={this.state.userRole} gameState={this.state.gameState} />
      </div>
    );
  }
}

export default App;
