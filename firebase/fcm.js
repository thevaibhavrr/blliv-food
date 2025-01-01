
// Initialize Firebase Admin SDK singleton
const FirebaseApp = require('./firebase-init.js');

const sendToAdminOrderTopic = async details => {
  const notificationData = {
  };

  return new Promise(resolve => {
    const message = {
      // Required for background/quit data-only messages on iOS
      // contentAvailable: true,
      // Required for background/quit data-only messages on Android
      android: {
        priority: 'high',
        ttl: 3600 * 1000,
        notification: {
          sound: 'default' // To play default sound for notification
          //   icon: 'stock_ticker_update',
          //   color: '#f45342',
        }
      },
      apns: {
        // IOS Configuration
        payload: {
          aps: {
            sound: 'default' // To play default sound for notification
          }
        }
      },
      data: notificationData, // data which app can read & process
      notification: {
        title: details.title, // Title of the notification
        body: details.body // Body of the notification
      },
      topic: 'admin_order'
    };
    try {
      FirebaseApp.messaging().send(message).then(response => {
        resolve(response);
      }).catch(err => {
        console.error('error in sending fcm notification', err);
        resolve({});
      });
    } catch (error) {
      console.error('error in calling FirebaseApp.messaging().send', error);
      resolve({});
    }
  });
};

module.exports = { sendToAdminOrderTopic }; 