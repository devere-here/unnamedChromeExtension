export const ADD_NEW_URL = 'ADD_NEW_URL'
export const REMOVE_NEW_URL = 'REMOVE_NEW_URL'
export const EDIT_URL = 'EDIT_URL'

const initialState = {
  websiteObjects: [],
  currentTabObject: {}
}

// Reducer
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NEW_URL:
      return { ...state, loading: true }
    case REMOVE_NEW_URL:
      return { ...state, loading: false, member: { ...action.payload.member } }
    case EDIT_URL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}