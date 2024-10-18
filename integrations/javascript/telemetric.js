//C:\Users\likam\Documents\AppDevelopment\Webapps\Telemetric-Private\integrations\javascript\dist
export default class Telemetric {
  static projectID = null;
  static userID = null;
  static version = null;

  static initial = false;

  static async init(projectID, version, trackOnLocalhost = false) {
    this.projectID = projectID;
    this.version = version;

    await this._initializeUserID();
    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/init";

    // Check if we should track on localhost
    if (window.location.hostname === "localhost" && !this.trackOnLocalhost) {
      console.log(
        "Telemetric initialized successfully, but will not send any data on Localhost."
      );
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: this.projectID,
          user_id: this.userID,
          version: this.version,

          referrer: document.referrer,
        }),
      });

      if (!response.ok) {
        console.error("Failed to initialize Telemetric");
      }
    } catch (e) {}
  }

  static async event(name) {
    if (!this.safetyCheck(`Event '${name}'`)) return;
    if (window.location.hostname === "localhost" && !this.trackOnLocalhost) {
      console.log("Telemetric: Not tracking on localhost.");
      return;
    }
    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/event";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: this.projectID,

          name: name,

          referrer: document.referrer,
          version: this.version,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send event:", response.status);
      }
    } catch (e) {
      console.error("Telemetric Event Error:", e);
    }
  }

  static async revenue(amount) {
    if (!this.safetyCheck("Revenue")) return;
    if (window.location.hostname === "localhost" && !this.trackOnLocalhost) {
      console.log("Telemetric: Not tracking on localhost.");
      return;
    }
    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/revenue";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: this.projectID,
          version: this.version,
          referrer: document.referrer,
          total: amount,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send revenue:", response.status);
      }
    } catch (e) {
      console.error("Telemetric Revenue Error:", e);
    }
  }

  static safetyCheck(source) {
    let isSafe = true;

    if (!this.projectID) {
      console.error(`${source} reporting failed. Missing project ID.`);
      isSafe = false;
    }

    if (!this.userID) {
      console.error(
        `${source} reporting failed. Missing user ID. Make sure to call init() before tracking events or revenue. Also make sure to await init()`
      );
      isSafe = false;
    }

    return isSafe;
  }

  static async _initializeUserID() {
    this.userID = localStorage.getItem("telemetric_user_id");
  
    if (!this.userID) {
      this.initial = true;
      this.userID = this._generateUserID();
      localStorage.setItem("telemetric_user_id", this.userID);
    }
  }

  static _generateUserID() {
    const random = () => Math.floor(Math.random() * 16).toString(16);
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = random();
      return c === "x" ? r : ((r & 0x3) | 0x8).toString(16);
    });
  }

  static async saveUserID(userID) {
    localStorage.setItem("telemetric_user_id", userID);
    this.userID = userID;
  }

  static async getUserID() {
    this.userID = localStorage.getItem("telemetric_user_id");
    return this.userID;
  }
}
