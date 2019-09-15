import React, { Component } from 'react';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      options: this.props.options,
      selected: this.props.selected,
      shouldViewMultiSelectContent: false,
      isContentSelected: false,
      val: ['val1','val2','val3','val4','val5'],
      selectedBackgroundColor: this.props.selectedBackgroundColor || 'default'
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
    const { selected, selectedBackgroundColor } = this.state;
    let isContentSelected = selected.includes(value);
    let circle, checkmark_kick, checkmark_stem;
    if(isContentSelected) {
      circle = `checkmark_circle circle_background_${selectedBackgroundColor}`;
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
    const { shouldViewMultiSelectContent, val, selected, selectedBackgroundColor } = this.state;
    let display = "dropdown-content "+ (shouldViewMultiSelectContent ? 'show ' : 'hide')+` content_${selectedBackgroundColor}` 
    return(
      <div>
        {val.map((v) => {
          let isContentSelected = selected.includes(v);
          let bg = isContentSelected ? ` selected-background-${selectedBackgroundColor}` : ``;
            return(
              <div className={display+bg} onClick={this.onSelectOption} key={v} data-value={v}>
                {this.renderIcon(v)}
                {v}
              </div>
            )
        })}
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