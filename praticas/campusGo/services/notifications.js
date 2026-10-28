import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const CHANNEL_ID = 'campusgo-reminders';

export async function setupChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Lembretes do CampusGo',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

export async function requestPermission() {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const asked = await Notifications.requestPermissionsAsync();
  return asked.granted;
}

export async function scheduleReminder(title, seconds) {
  await setupChannel();
  const allowed = await requestPermission();
  if (!allowed) return null;

  return Notifications.scheduleNotificationAsync({
    content: { title: 'CampusGo', body: title },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: CHANNEL_ID,
    },
  });
}
