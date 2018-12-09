
import * as React from "react";
import classnames from "classnames";

import "./loader-linear.scss";

export default class LoaderLinear extends React.Component {
  render() {
    return (
      <div
        className={classnames("loader-linear", {
          "is-loading": this.props.isLoading
        })}
      >
        <div className="loader-linear__track" />
        <div className="loader-linear__indicator" />
      </div>
    );
  }
}
