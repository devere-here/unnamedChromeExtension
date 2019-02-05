export const ADD_NEW_URL = 'ADD_NEW_URL'
export const REMOVE_NEW_URL = 'REMOVE_NEW_URL'
export const EDIT_URL = 'EDIT_URL'

const initialState = {
  websiteObjects: [],
  currentTabObject: {}
}

export const addWebsiteObject = (websiteObject) => ({type: ADD_NEW_URL, payload: websiteObject})

export const deleteWebsiteObject = (websiteObject) => ({type: REMOVE_NEW_URL, payload: websiteObject})

// Reducer
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NEW_URL:
      const { websiteObjects } = state
      return { ...state, websiteObjects: websiteObjects.concat(action.payload) }
    case REMOVE_NEW_URL:
      return { ...state, websiteObjects: websiteObjects.filter(elem => elem.url === action.payload.url)}
    case EDIT_URL:
      return { ...state, websiteObjects: action.websiteObjects }
    default:
      return state
  }
}
