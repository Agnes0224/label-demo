import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUsage: 'task',
    tags: ['Equipment', 'Technology', 'Academic'],
    options: [
        { label: 'Positive', value: 'Positive' },
        { label: 'Negative', value: 'Negative' },
        { label: 'Neutral', value: 'Neutral' },
    ]
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changeCurrentUsage: {
            reducer(state, action) {
                state.currentUsage = action.payload
            }
        },
        addTag:{
            reducer(state, action) {
                state.tags = [...state.tags, action.payload]
            }
        },
        deleteTag:{
            reducer(state, action) {
                console.log(action.payload)
                state.tags = state.tags.filter(tag => tag !== action.payload)
            }   
        }
    }
})

export const { addTag, changeCurrentUsage, deleteTag } = pageSlice.actions

export default pageSlice.reducer

export const selectAllTags = (state) => state.page.tags

export const selectAllOptions = (state) => state.page.options
