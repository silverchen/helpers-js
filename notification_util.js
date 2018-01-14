import axios from 'axios';
import {
	API_ENDPOINT_UPDATE_USER,
  API_CHAT_GET_BOT
} from './../api';
import Global from './../global';
import { showNotification } from './../index';

var NotificationUtil = module.exports = {
  showNotification: function (data) {
    if (data && data.responseData && data.currentUserId) {
      const message = data.responseData;

      if (message.is_robot_say === 1) {
        axios.get(`${Global.getApiChatUrl()}/${API_CHAT_GET_BOT}`)
          .then(function (response) {
            if (response && response.data && response.data.data) {
              const b = response.data.data;
              showNotification(b.avatar, b.first_name + ":", message.content);
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (message.from_user_id && message.from_user_id !== data.currentUserId) {
        axios.get(`${Global.getApiRootUrl()}/${API_ENDPOINT_UPDATE_USER(message.from_user_id)}`)
          .then(function (response) {
            if (response && response.data && response.data.data) {
              const u = response.data.data;
              showNotification(u.avatar, u.first_name + " " + u.last_name + ":", message.content);
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
};
