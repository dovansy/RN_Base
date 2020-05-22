import axios from "axios";
import {  Alert } from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
import I18n from "../i18n/i18n";
import AsyncStorage from '@react-native-community/async-storage'

function createAxios() {
  
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "http://winds.hopto.org:8521";
  axiosInstant.defaults.timeout = 20000;
  axiosInstant.defaults.headers = { "Content-Type": "application/json" };

  axiosInstant.interceptors.request.use(
    async config => {
      config.headers.token = await AsyncStorage.getItem("token");
      return config;
    },
    error => Promise.reject(error)
  );

  axiosInstant.interceptors.response.use(response => {
    if (response.data && response.data.code == 403) {
      setTimeout(() => {
        Alert.alert("Thông báo", I18n.t("relogin"));
      }, 100);

      AsyncStorage.setItem("token", "", () => {
        NavigationUtil.navigate("Auth");
      });
    } else if (response.data && response.data.status != 1) {
      setTimeout(() => {
        Alert.alert("Thông báo", response.data.message);
      }, 100);
    }
    return response;
  });
  return axiosInstant;
}

export const getAxios = createAxios();

/* Support function */
function handleResult(api) {
  return api.then(res => {
    if (res.data.status != 1) {
      return Promise.reject(new Error("Co loi xay ra"));
    }
    return Promise.resolve(res.data);
  });
}

export const requestLogin = (payload) => {
  return handleResult(
    getAxios.post('api/Service/LoginApp', payload)
  );
};

export const requestHomeData = (deviceID = "") => {
  return handleResult(
    getAxios.get(`api/Service/GetHomeScreen?deviceID=${deviceID}`)
  );
};
//product list
export const requestProduct = () => {
  return handleResult(
    getAxios.get(`api/Service/getListCategory`)
  );
};

export const requestListProduct = payload => {
  return handleResult(
    getAxios.get(
      `api/Service/getListProduct?childID=${payload.childID}&page=${payload.page}&limit=10&parentID=${payload.parentID}&text=`
    )
  );
};

export const requestNotification = () => {
  return handleResult(
    getAxios.get(`api/Service/GetNotify`)
  );
};

export const requestUserInfo = () => {
  return handleResult(
    getAxios.get(`api/Service/GetUserInfor`)
  );
};

export const requestListGifts = () => {
  return handleResult(
    getAxios.get(`api/Service/GetListGifts`)
  );
};


