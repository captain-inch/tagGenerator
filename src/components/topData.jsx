import React, { Component } from "react";

export default class TopData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const ret = this.props.topData.reduce((acc, d) => {
      acc.push(<li>{d}</li>);
      return acc;
    }, []);
    return (
      <div className="flex center flex-column justify-center align-center f3 w-100 w-50-m w-25-l">
        <p className="mb0 ml4 b">Top {this.props.topData.length} tags</p>
        <ol className="ttc ml5">{ret}</ol>
      </div>
    );
  }
}
