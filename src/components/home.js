import React, { Component } from 'react';
import MultiSelect from './multiSelect';

const options = [
  {label: "One", value: 1},
  {label: "Two", value: 2},
  {label: "Three", value: 3},
];


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []        
    }
  }

  onSelectedChange = (selected) => {
    this.setState({
      selected: selected
    })
  }

  render() {
    const { selected } = this.state;  
    return (
      <div>
        <MultiSelect 
          options={options}
          selected={selected}
          onSelectedChange={this.onSelectedChange}
        />
      </div>
    );
  }
}
 
export default Home;