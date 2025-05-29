
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Toast } from '@capacitor/toast';
import { LocalNotifications } from '@capacitor/local-notifications';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export const mobileUtils = {
  // Haptic feedback for button presses
  hapticFeedback: async (style: ImpactStyle = ImpactStyle.Medium) => {
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  },

  // Show native toast messages
  showToast: async (message: string, duration: 'short' | 'long' = 'short') => {
    try {
      await Toast.show({
        text: message,
        duration: duration,
        position: 'bottom'
      });
    } catch (error) {
      console.log('Toast not available:', error);
    }
  },

  // Schedule order ready notification
  scheduleOrderNotification: async (orderId: string, estimatedTime: number) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Order Ready! 🍽️',
            body: `Your order ${orderId} is ready for pickup at Sathyabama Canteen`,
            id: parseInt(orderId.replace(/\D/g, '')),
            schedule: { at: new Date(Date.now() + estimatedTime * 60 * 1000) },
            sound: 'beep.wav',
            attachments: undefined,
            actionTypeId: '',
            extra: { orderId }
          }
        ]
      });
    } catch (error) {
      console.log('Notifications not available:', error);
    }
  },

  // Set status bar style
  setStatusBarStyle: async (isDark: boolean = true) => {
    try {
      await StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
      });
    } catch (error) {
      console.log('StatusBar not available:', error);
    }
  },

  // Hide splash screen
  hideSplashScreen: async () => {
    try {
      await SplashScreen.hide();
    } catch (error) {
      console.log('SplashScreen not available:', error);
    }
  },

  // Request notification permissions
  requestNotificationPermissions: async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.log('Notification permissions not available:', error);
      return false;
    }
  }
};
