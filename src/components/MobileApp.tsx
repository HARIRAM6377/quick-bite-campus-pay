
import React, { useEffect } from 'react';
import { mobileUtils } from '../utils/mobileUtils';
import Index from '../pages/Index';

const MobileApp = () => {
  useEffect(() => {
    const initializeMobileApp = async () => {
      // Hide splash screen
      await mobileUtils.hideSplashScreen();
      
      // Set status bar style
      await mobileUtils.setStatusBarStyle(true);
      
      // Request notification permissions
      await mobileUtils.requestNotificationPermissions();
      
      // Show welcome toast
      setTimeout(() => {
        mobileUtils.showToast('Welcome to Sathyabama Canteen! 🍽️', 'long');
      }, 1000);
    };

    initializeMobileApp();
  }, []);

  return <Index />;
};

export default MobileApp;
