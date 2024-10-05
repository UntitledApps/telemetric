import React, { useEffect } from "react";
import { Spinner } from "spin.js";
import "spin.js/spin.css"; // Import the CSS file

const LoadingSpinner: React.FC = () => {
  useEffect(() => {
    const target = document.getElementById("foo");
    if (target) {
      // Check if target is not null
      const spinner = new Spinner({
        lines: 20, // The number of lines to draw
        length: 40, // The length of each line
        width: 24, // The line thickness
        radius: 50, // The radius of the inner circle
        scale: 0.1, // Scales overall size of the spinner
        corners: 0, // Corner roundness (0..1)
        speed: 1.2, // Rounds per second
        rotate: 81, // The rotation offset
        animation: "spinner-line-fade-quick", // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: "#ffffff", // CSS color or array of colors
        fadeColor: "transparent", // CSS color or array of colors
        top: "50%", // Top position relative to parent
        left: "50%", // Left position relative to parent
        shadow: "0 0 1px transparent", // Box-shadow for the lines
        zIndex: 2000000000, // The z-index (defaults to 2e9)
        className: "spinner", // The CSS class to assign to the spinner
        position: "absolute",
      }).spin(target);

      // Cleanup function to stop the spinner when the component unmounts
      return () => {
        spinner.stop();
      };
    }
  }, []);

  return <div id="foo" className="spinner" />; // Render the target element for the spinner
};

export default LoadingSpinner;
