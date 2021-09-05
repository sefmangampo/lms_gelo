// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "devextreme/dist/css/dx.material.teal.dark.compact.css";

import Home from "./components/Home";

const Hello = (props) => (
  <div>
    <Home />
  </div>
);

Hello.defaultProps = {
  name: "Gelo",
};

Hello.propTypes = {
  name: PropTypes.string,
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Hello />,
    document.body.appendChild(document.createElement("div"))
  );
});
