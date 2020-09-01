import React, { Component } from "react";

class ToggleView extends Component {
  state = {
    isVisible: false,
  };

  toggleViewer = () => {
    this.setState(({ isVisible }) => {
      return { isVisible: !isVisible };
    });
  };

  render() {
    const { isVisible } = this.state;
    return (
      <div>
        {isVisible && this.props.children}
        <header>
          <label>
            Show topics chart:
            <button className="button" onClick={this.toggleViewer}>
              {isVisible ? "Hide" : "Show"}
            </button>
          </label>
        </header>
      </div>
    );
  }
}

export default ToggleView;
