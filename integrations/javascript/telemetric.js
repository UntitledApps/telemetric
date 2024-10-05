export default class Telemetric {
  static projectID = null;
  static userID = null;

  static async init(projectID) {
    this.projectID = projectID;
    await this._initializeUserID();
    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/init";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectID: this.projectID,
          userID: this.userID,
          os: this.getOSFromUserAgent(navigator.userAgent),
          browser: this.getBrowserFromUserAgent(navigator.userAgent),
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

    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/event";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectID: this.projectID,
          userID: this.userID,
          name: name,
          debugData: window.location.hostname === "localhost",
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

    const url = "https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/revenue";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectID: this.projectID,
          userID: this.userID,
          total: amount,
          debugData: window.location.hostname === "localhost",
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
    this.userID = localStorage.getItem("user_id");
    if (!this.userID) {
      this.userID = this._generateUserID();
      localStorage.setItem("user_id", this.userID);
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
    localStorage.setItem("user_id", userID);
    this.userID = userID;
  }

  static async getUserID() {
    this.userID = localStorage.getItem("user_id");
    return this.userID;
  }

  static getOSFromUserAgent(userAgent) {
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac OS")) return "Mac OS";
    if (userAgent.includes("X11")) return "UNIX";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad"))
      return "iOS";
    return "Unknown";
  }

  static getBrowserFromUserAgent(userAgent) {
    if (userAgent.includes("Edge") || userAgent.includes("Edg")) return "Edge";
    if (userAgent.includes("Opera") || userAgent.includes("OPR"))
      return "Opera";
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
      return "Safari";
    if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
      return "Internet Explorer";
    return "Unknown";
  }
}
