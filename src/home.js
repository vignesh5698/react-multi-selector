import React, { Component } from 'react';
import MultiSelect from './multiSelect';

// const options = [
//   {label: "One", value: 1},
//   {label: "Two", value: 2},
//   {label: "Three", value: 3},
// ];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      options: ['val1','val2','val3','val4','val5']
    }
  }

  onSelectedChange = (selectedList) => {
    this.setState({
      selected: selectedList
    })
  }

  render() {
    const { selected, options } = this.state;
    return (
      <div>
        <MultiSelect 
          options={options}
          selected={selected}
          onSelectedChange={this.onSelectedChange}
          selectedBackgroundColor='green'
        />
      </div>
    );
  }
}

export default Home;
