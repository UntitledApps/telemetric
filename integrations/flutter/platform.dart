import 'dart:io' show Platform;

import 'package:flutter/foundation.dart' show kIsWeb;

// Conditional import based on the platform
import 'platform_web.dart' if (dart.library.io) 'platform_non_web.dart';

class PlatformUtils {
  static String getOS() {
    if (kIsWeb) {
      // Get the user agent string using the web-specific function
      String userAgent = getUserAgent();

      if (userAgent.contains('win')) {
        return 'windows';
      } else if (userAgent.contains('mac')) {
        return 'macos';
      } else if (userAgent.contains('linux')) {
        return 'linux';
      } else if (userAgent.contains('android')) {
        return 'android';
      } else if (userAgent.contains('ios') ||
          userAgent.contains('iphone') ||
          userAgent.contains('ipad')) {
        return 'ios';
      } else {
        return 'unknown';
      }
    } else {
      // Handle non-web platforms
      if (Platform.isAndroid) {
        return 'android';
      } else if (Platform.isIOS) {
        return 'ios';
      } else if (Platform.isLinux) {
        return 'linux';
      } else if (Platform.isMacOS) {
        return 'macos';
      } else if (Platform.isWindows) {
        return 'windows';
      } else {
        return 'unknown';
      }
    }
  }
}
