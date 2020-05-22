import {
  GET_USER,
  GET_USER_FAIL,
  GET_USER_SUCCESS
} from "./type";

export const getUserInfoAction = () => ({
  type: GET_USER,
  payload: {}
});
export const getUserInfoActionSucces = () => ({
  type: GET_USER_SUCCESS,
  payload: {}
});
export const getUserInfoActionFail = () => ({
  type: GET_USER_FAIL,
  payload: {}
});
