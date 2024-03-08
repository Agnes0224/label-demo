import { configureStore } from '@reduxjs/toolkit'
import sentenceReducer from './LabelPage/AnnotationSlice'
import pageReducer from './LabelPage/PageSlice'
// import authReducer from './LoginPage/AuthSlice'
import userReducer from './LoginPage/reducer'

export const store = configureStore({
    reducer: {
      sentence: sentenceReducer,
      page: pageReducer,
      // auth: authReducer,
      user: userReducer,
    }
  })