import React, { Component } from 'react';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      options: this.props.options,
      selected: this.props.selected,
      shouldViewMultiSelectContent: false,
      isContentSelected: false
    }
  }

  onSelectOption = (event) => {
    const selectedValue = event.currentTarget.dataset.value;
    let { selected } = this.state;
    let shouldAddedToList = !selected.includes(selectedValue);
    if(shouldAddedToList) {
      selected.push(selectedValue);
      this.setState({
        selected,
        isContentSelected: true
      })
    } else {
      let newArray = selected.splice(selected.indexOf(selectedValue),1);
      this.setState({
        isContentSelected: false
      })
      return this.props.onSelectedChange(newArray);
    }
    
  }

  renderIcon = (value) => {
    const { selected } = this.state;
    let isContentSelected = selected.includes(value);
    let circle, checkmark_kick, checkmark_stem;
    if(isContentSelected) {
      circle = `checkmark_circle`;
      checkmark_stem = `selected_checkmark_stem`;
      checkmark_kick = `selected_checkmark_kick`;
    }else {
      circle = ``;
      checkmark_stem = `unselected_checkmark_stem`;
      checkmark_kick = `unselected_checkmark_kick`;
    }
    return(
        <span className="checkmark">
          <div className={circle}></div>
          <div className={checkmark_stem}></div>
          <div className={checkmark_kick}></div>
      </span>
    )
  }
  
  renderMultiSelectContent = () => {
    const { shouldViewMultiSelectContent } = this.state;
    let display = "dropdown-content "+ (shouldViewMultiSelectContent ? 'show' : 'hide')+" content"
    return(
      <div>
        <div className={display} onClick={this.onSelectOption} key={1} data-value={'value1'}>
          {this.renderIcon('value1')}
          {/* value1 */}
        </div>
        <div className={display} onClick={this.onSelectOption} key={2} data-value={'value2'}>
        {this.renderIcon('value2')}
          {/* value2 */}
        </div>
        <div className={display} onClick={this.onSelectOption} key={3} data-value={'value3'}>
        {this.renderIcon('value3')}
          {/* value3 */}
        </div>
        <div className={display} onClick={this.onSelectOption} key={4} data-value={'value4'}>
        {this.renderIcon('value4')}
          value4
        </div>
        <div className={display} onClick={this.onSelectOption} key={5} data-value={'value5'}>
        {this.renderIcon('value5')}
          value5
        </div>
      </div>
    )
  }

  onViewMultiSelectContent = () => {
    this.setState({
      shouldViewMultiSelectContent: !this.state.shouldViewMultiSelectContent
    })
  }

  renderMultiSelect = () => {
    return(
      <div>
        <div className="dropdown-button">
          <div className="dropdown" type="button" onClick={this.onViewMultiSelectContent}>
            Dropdown button
            <i className="fa fa-angle-down dropdown-icon"></i>
          </div>
          {this.renderMultiSelectContent()}
        </div>
      </div>
    )
  }

  render() {
    console.log(this.state.selected);
    return ( 
      <div>
        {this.renderMultiSelect()}
      </div>
    );
  }
}
 
export default MultiSelect;