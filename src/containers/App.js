import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ScrollBar from '../components/ScrollBar';

import './App.css';
import { setSearchField, requestRobots } from '../actions';

// parameter state comes from index.js provider store state(rootReducers)

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }
  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filterRobot = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>Robofriend Web App</h1>
          <SearchBox searchChange={onSearchChange} />
          {/*<ErrorBoundry>*/}
          <ScrollBar >
            <CardList robots={filterRobot} />
          </ScrollBar>
          {/*</ErrorBoundry>*/}
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
