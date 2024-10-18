// sdk.js

(function (global) {
  const SDK = {};

  // Configuration for the SDK
  let apiUrl = "https://your-api-endpoint.com/api/collect-event";

  // Initialize the SDK
  SDK.init = function (config) {
    if (config.apiUrl) {
      apiUrl = config.apiUrl;
    }
  };

  // Function to send events
  SDK.sendEvent = function (eventType, eventData) {
    const deviceId =
      localStorage.getItem("device_id") || generateUniqueDeviceId();
    localStorage.setItem("device_id", deviceId);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_id: deviceId,
        event_type: eventType,
        event_data: eventData,
      }),
    });
  };

  // Function to generate a unique device ID
  function generateUniqueDeviceId() {
    return crypto.randomUUID(); // For modern browsers
  }

  // Expose the SDK to the global object
  global.MyAnalyticsSDK = SDK;
})(window);
