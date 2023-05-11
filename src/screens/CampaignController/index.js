import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import crashlytics from '@react-native-firebase/crashlytics';
export const markReceive = async cid => {
  let uID = '';
  try {
    await AsyncStorage.getItem('userData', (error, value) => {
      if (error) {
      } else {
        if (value !== null) {
          id = JSON.parse(value)?.id_user;
        } else {
        }
      }
    });
  } catch (err) {
    crashlytics().recordError(err);

    console.log('ERROR IN GETTING USER FROM STORAGE');
  }

  let body = {
    user_id: uID + '',
    cid: cid + '',
    guest_id: '',
  };

  ShowConsoleLogMessage(JSON.stringify(body));

  // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
  ApiCall('post', body, API_END_POINTS.API_MARK_RECEIVE, {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  })
    .then(response => {
      ShowConsoleLogMessage(response);
    })
    .catch(err => {
      crashlytics().recordError(err);

      ShowConsoleLogMessage(
        'Error in get offer recent api call: ' + err.message,
      );
    })
    .finally(() => {});
};
export const markAsRead = (cid, user_id) => {
  let body = {
    user_id: user_id + '',
    cid: cid + '',
    guest_id: '',
  };

  // ShowConsoleLogMessage(JSON.stringify(body));

  // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
  ApiCall('post', body, API_END_POINTS.API_MARK_VIEW, {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  })
    .then(response => {
      //   ShowConsoleLogMessage(JSON.stringify(response) + ' -> api mark view');
    })
    .catch(err => {
      crashlytics().recordError(err);

      ShowConsoleLogMessage(
        'Error in get offer recent api call: ' + err.message,
      );
    })
    .finally(() => {});
};
