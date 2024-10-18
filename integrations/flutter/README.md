# Official Telemetric Flutter & Dart Package

Telemetric is the privacy friendly, open source way of collecting user data.
Use it in your apps, websites and webapps without having to worry about privacy compliance.

### Installing

Run this in your terminal:

```bash
flutter pub add telemetric
```

OR add the following to your `pubspec.yaml` file:

```yaml
dependencies:
  telemetric: ^0.0.7
```

### Usage

### Initialization

Initialize the Telemetric package with your project ID. This should be done once, typically in the main method of your app.

```dart
import 'package:telemetric/telemetric.dart';

void main() {
  Telemetric.initialize('YOUR_PROJECT_ID');
}
```

### Event Tracking

You can use emojis here and white space. E.g "App Launched ✨"

```dart
Telemetric.event('event_name');
```

### Revenue Tracking

Track revenue by calling the revenue method with the amount as a double. E.g 0.99$ = 0.99, 5.49$ = 5.49

```dart
Telemetric.revenue(1.99);
```

## Support

If you have any questions or need help, feel free to open an issue on [GitHub](https://github.com/UntitledApps/telemetric/issues), or join the [X Community](https://x.com/messages/compose?recipient_id=1680911613988073473).
