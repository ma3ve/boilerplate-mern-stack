import { SET_USER, SET_LOADING, SET_ERROR } from "./types";

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: loading,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error,
  };
}
