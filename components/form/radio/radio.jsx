import React from 'react'
import styles from './_stylesheet'

export default class Radio extends React.Component {
  onChange(e) {
    if(this.props.disabled){
      return;
    }
    this.props.onChange && this.props.onChange(e.target.value)
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      return typeof child === 'string'
      ? <span dangerouslySetInnerHTML={ {__html: child} }></span>
      : child
    })
  }

  render() {
    let id = `radio-${this.props.name}-${this.props.value}`
    let props = {
      name: this.props.name,
      value: this.props.value,
      id: id,
      onChange: ::this.onChange,
      checked: this.props.selected,
    }

    let radioStyle = {
      margin: '10px 0',
      position:'relative'
    }
    let discColor = styles.disc.backgroundColor;
    if(this.props.disabled){
      radioStyle.color = '#BFBFBF';
      discColor = '#BFBFBF';
    }
    styles.disc.backgroundColor = discColor;

    return (
      <div style={radioStyle}>
        <input type="radio" {...props} style={{display:'none'}} />
        <label htmlFor={id} style={{cursor:'pointer',display:'block'}}>
          <i style={styles.radioIcon}>
            {this.props.selected? <span style={styles.disc}/> : null}
          </i>
          <div style={{display:'block', overflow:'hidden'}}>{this.renderChildren()}</div>
        </label>
      </div>
    );
  }
}
