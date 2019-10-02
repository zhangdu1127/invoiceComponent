import React from "react";
import "./css/App.css";
import Invoice from "./components/invoice"

export default class App extends React.Component {
  render() {
    return <div className="container">
      <Invoice url="#" method="GET" contentText="点击我显示invoice"></Invoice>
    </div>
  }
}