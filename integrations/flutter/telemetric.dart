library telemetric;

import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'dart:math' hide log;

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// The Telemetric class provides methods to track events and revenue.
class Telemetric {
  // Private variable to store the project ID
  static String? _projectID;
  static String? _userID;
  static bool initial = false;
  static bool trackInDebug = false;
  static String? _version = '1.0.0';

  /// Initializes the Telemetric with a [projectID].
  /// Always await this method to make sure the initialization is complete. After initialization, you can start tracking events or revenue.
  /// This method should be called once when the app starts for example in the main method.
  static Future<void> init(String projectID,
      {String? version, bool trackInDebug = false}) async {
    _projectID = projectID;
    trackInDebug = trackInDebug;
    _version = version;

    // Check if user ID exists in storage, if not create a new one
    if (kDebugMode && !trackInDebug) return;
    await _initializeUserID();
    const url = 'https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/init';

    try {
      // Create a request
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'projectID': _projectID,
          "initial": initial,
          "version": _version,
          "os": _getOS(),
        }),
      );

      // Check the status code
      if (response.statusCode == 200) {
        // Read the response
      } else {
        // Handle non-200 status code
      }
    } catch (e) {
      return log(
          '[This might be due to no internet connection]. Telemetric Init Error: $e');
    }
  }

  /// Tracks an event with a [name]
  /// You can use whitespaces and emojis in the event name.
  /// E.g. 'App Opened', '🚀 Launched'
  static Future<void> event(String name) async {
    if (!safetyCheck(
      "Event '$name'",
    )) return;
    if (kDebugMode && !trackInDebug) return;
    const url = 'https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/event';

    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'projectID': _projectID,
          'userID': _userID,
          'name': name,
          "debugData": kDebugMode,
          'referrer':
              kIsWeb ? html.document.referrer : packageInfo.installerStore,
          "version": packageInfo.version,
        }),
      );

      if (response.statusCode == 200) {
      } else {
        log('Failed to send event: ${response.statusCode}');
      }
    } catch (e) {
      log('Telemetric Event Error: $e');
    }
  }

  /// Tracks revenue with an [amount]
  /// Send as a double. We'll handle the conversion.
  /// E.g 0.99 for $0.99
  static Future<void> revenue(double amount) async {
    if (!safetyCheck('Revenue')) return;
    if (kDebugMode && !trackInDebug) return;
    const url = 'https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/revenue';

    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'projectID': _projectID,
          'userID': _userID,
          'total': amount,
          "debugData": kDebugMode,
          "os": _getOS(),
          'referrer':
              kIsWeb ? html.document.referrer : packageInfo.installerStore,
          "version": packageInfo.version,
        }),
      );

      if (response.statusCode == 200) {
      } else {
        log('Failed to send revenue: ${response.statusCode}');
      }
    } catch (e) {
      log('Telemetric Revenue Error: $e');
    }
  }

  /// Checks if the project ID and user ID are set.
  static bool safetyCheck(String source) {
    bool isSafe = true;

    if (_projectID == null) {
      log('$source reporting failed. Missing project ID.');
      isSafe = false;
    }

    if (_userID == null) {
      log('$source reporting failed. Missing user ID. Make sure to call init() before tracking events or revenue. Also make sure to await init()');
      isSafe = false;
    }

    return isSafe;
  }

  /// Initializes the user ID if it does not exist.
  static Future<void> _initializeUserID() async {
    final prefs = await SharedPreferences.getInstance();
    _userID = prefs.getString('telemetric_user_id');
    if (_userID == null) {
      _userID = _generateUserID();
      await prefs.setString('telemetric_user_id', _userID!);
    }
  }

  /// Generates a new user ID.
  static String _generateUserID() {
    final Random random = Random();
    final StringBuffer buffer = StringBuffer();
    for (int i = 0; i < 32; i++) {
      int value = random.nextInt(16);
      if (i == 8 || i == 12 || i == 16 || i == 20) {
        buffer.write('-');
      }
      if (i == 12) {
        value = 4; // The 13th character is '4'
      } else if (i == 16) {
        value =
            (value & 0x3) | 0x8; // The 17th character is '8', '9', 'A', or 'B'
      }
      buffer.write(value.toRadixString(16));
    }

    return buffer.toString();
  }

  /// Saves the user ID.
  static Future<void> saveUserID(String userID) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('telemetric_user_id', userID);
    _userID = userID;
  }

  static Future<String?> getUserID() async {
    final prefs = await SharedPreferences.getInstance();
    _userID = prefs.getString('telemetric_user_id');
    return _userID;
  }

  static String _getOS() {
    if (kIsWeb) {
      return 'web';
    } else if (Platform.isAndroid) {
      return 'android';
    } else if (Platform.isIOS) {
      return 'ios';
    } else if (Platform.isLinux) {
      return 'linux';
    } else if (Platform.isMacOS) {
      return 'macos';
    } else if (Platform.isWindows) {
      return 'windows';
    } else if (Platform.isFuchsia) {
      return 'fuchsia';
    } else {
      return 'unknown';
    }
  }
}
