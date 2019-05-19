export const ADD_NEW_URL = 'ADD_NEW_URL'
export const BULK_ADD = 'BULK_ADD'
export const REMOVE_NEW_URL = 'REMOVE_NEW_URL'
export const EDIT_URL = 'EDIT_URL'

const initialState = []

export const addWebsiteObject = (websiteObject) => ({type: ADD_NEW_URL, payload: websiteObject})

export const initWebsiteList = (websiteArray) => {
  return (dispatch) => dispatch({type: BULK_ADD, payload: websiteArray})
}

export const deleteWebsiteObject = (websiteObject) => ({type: REMOVE_NEW_URL, payload: websiteObject})

// Reducer
export default function(state = initialState, action = {}) {
  switch (action.type) {
    case BULK_ADD:
      return state.concat(action.payload)
    case ADD_NEW_URL:
      return [...state, action.payload]
    case REMOVE_NEW_URL:
      return state.filter(elem => elem.url === action.payload.url)
    case EDIT_URL:
      return state.map(website => {
        const { payload } = action

        if (website.url !== payload.url) return website
        return payload
      })
    default:
      return state
  }
}
