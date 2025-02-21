import { createContext } from "react";

// useContext 跨元件傳遞
export const MessageContext = createContext();

export const initState = {
  type: '', // success, danger
  title: '',
  text: ''
}

// Reducer
export const messageReducer = (state, action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      return {
        ...action.payload
        // type: 'success', // success, danger
        // title: 'POST_MESSAGE',
        // text: 'POST_MESSAGE'
      };
    case 'CLEAR_MESSAGE':
      return {
        ...initState
      };
    default:
      state;
  }
}

export function handleSuccessMessage(dispatch, message) {  
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'success',
      title: '成功',
      text: message
    }
  });
  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }, 3000)
}

export function handleErrorMessage(dispatch, message) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'danger',
      title: '失敗',
      text: Array.isArray(message)
        ? message.join('、')
        : message
    }
  });
  setTimeout(() => {
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }, 3000)
}