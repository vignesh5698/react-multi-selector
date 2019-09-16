import React, { Component } from 'react';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      options: [],
      selected: [],
      shouldViewMultiSelectContent: false,
      isContentSelected: false,
      selectedBackgroundColor: this.props.selectedBackgroundColor || 'default',
      dropdownButtonTitle: this.props.dropdownButtonTitle || 'Select from the list',
      selectAll: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
      return{
        selected: nextProps.selected,
        options: nextProps.options
      }
    
  }
  
  onSelectOption = (event) => {
    const selectedValue = event.currentTarget.dataset.value;
    let { selected } = Object.assign({}, this.state);
    let shouldAddedToList = !selected.includes(selectedValue);
    if(shouldAddedToList) {
      selected.push(selectedValue);
      return this.props.onSelectedChange(selected);
    } else {
      let indexOfSelectedOption = selected.indexOf(selectedValue);
      selected.splice(indexOfSelectedOption, 1);
      this.setState({
        selectAll: false
      })
      return this.props.onSelectedChange(selected);
    }
    
  }

  getBackgroundColor = () => {
    const { selectedBackgroundColor } = this.state;
    const availableColors = ['red', 'green', 'blue'];
    let isSelectedColorAvailable = availableColors.includes(selectedBackgroundColor);
    return isSelectedColorAvailable ? selectedBackgroundColor : 'default';
  }

  renderIcon = (value) => {
    const { selected, selectAll } = this.state;
    const selectedBackgroundColor = this.getBackgroundColor();
    let isContentSelected = selected.includes(value);
    let circle, checkmark_kick, checkmark_stem;
    if(isContentSelected || selectAll) {
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

  renderSelectAll = (displayProperty) => {
    let { selectAll } = this.state;
    const selectedBackgroundColor = this.getBackgroundColor();
    let bg = selectAll ? ` selected-background-${selectedBackgroundColor}` : ``;
    return(
      <div className={displayProperty+bg} onClick={this.onSelectAll} key={0} data-value={'select-all'}>
        {this.renderIcon()}
        Select All
      </div>
    )
  }

  onSelectAll = () => {
    const { options } = this.state;
    const allOptions = Object.assign([], options);
    this.setState({
      selectAll: !this.state.selectAll
    }, () => {
      let selected = this.state.selectAll ? allOptions : [];
      return this.props.onSelectedChange(selected)
    })
  }

  renderMultiSelectContent = () => {
    const { shouldViewMultiSelectContent, options, selected } = this.state;
    const selectedBackgroundColor = this.getBackgroundColor();
    let displayProperty = "dropdown-content "+ (shouldViewMultiSelectContent ? 'show ' : 'hide')+` content_${selectedBackgroundColor}` 
    return(
      <div>
        {this.renderSelectAll(displayProperty)}
        {options.map((option) => {
          let isContentSelected = selected.includes(option);
          let bg = isContentSelected ? ` selected-background-${selectedBackgroundColor}` : ``;
            return(
              <div className={displayProperty+bg} onClick={this.onSelectOption} key={option} data-value={option}>
                {this.renderIcon(option)}
                {option}
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

  renderDropdownIcon = () => {
    let { shouldViewMultiSelectContent } = this.state;
    let dropdownIcon = shouldViewMultiSelectContent ? `close` : `open`;
    return(
      <span className="dropdown-icon">
        <div className={`${dropdownIcon}-stem`}></div>
        <div className={`${dropdownIcon}-kick`}></div>
      </span>
    )
  }

  renderMultiSelect = () => {
    const dropdownButtonTitle = this.state.dropdownButtonTitle;
    return(
      <div>
        <div className="dropdown-button">       
          <div className="dropdown" type="button" onClick={this.onViewMultiSelectContent}>
          {this.renderDropdownIcon()} 
          {dropdownButtonTitle}
          </div>
          {this.renderMultiSelectContent()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderMultiSelect()}
      </div>
    );
  }
}
 
export default MultiSelect;