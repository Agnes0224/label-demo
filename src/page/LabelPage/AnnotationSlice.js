import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit"
import { createClient } from "@supabase/supabase-js";
// import { http } from "../../api/server"

const initialState = {
    data: [],
    status:'idle'
};

const supabase = createClient("https://oheprojjktqeszgluupx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZXByb2pqa3RxZXN6Z2x1dXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4ODI4MDgsImV4cCI6MjAyNTQ1ODgwOH0.nj68A-5-731bkwVKrNfNIrJ31iVUiWH6PZ3DrvR153c");

export const fetchSentences = createAsyncThunk('sentences/fetchSentencs', async() => {
    
    const response = await supabase
    .from('sentences')
    .select('*')

    console.log(response.data)
            
    return response.data
})

export const annotationSlice = createSlice({
    name: 'sentence',
    initialState,
    reducers: {
        addSentenceType:{
            reducer(state, action) {
                const { id, type, selectedText, selectedTag, tagColor, annotationColor } = action.payload
                const sentence = state.data.find(sentence => sentence.id === id)
                // console.log(action.payload)
                if(sentence) {
                    sentence.type = type
                    sentence.isLabeled = true
                    sentence.selectedText = selectedText
                    sentence.tagColor = tagColor
                    sentence.annotationColor = annotationColor
                    sentence.isEdit = false
                }
                if(selectedTag) {
                    sentence.selectedTag = selectedTag
                    sentence.annotation = true
                }
            },
        },
        editAnnotation:{
            reducer(state, action) {
                const id = action.payload
                const sentence = state.data.find(sentence => sentence.id === id)
                if (sentence) {
                    sentence.isEdit = true
                }
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchSentences.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchSentences.fulfilled, (state, action) => {
            state.status = "succeeded"
            console.log(action.payload)
            state.data = state.data.concat(action.payload)
        })
        .addCase(fetchSentences.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })   
    }
})

export default annotationSlice.reducer

export const { addSentenceType, editAnnotation } = annotationSlice.actions

export const selectAllSentences = (state) => state.sentence.data
export const selectLabeledSentences = (state) => state.sentence.data.filter(sentence => sentence.isLabeled === true).length

export const selectUnLabeledSentencesId = createSelector([selectAllSentences], 
    (sentences) => sentences.filter(sentence => sentence.isLabeled === false).map(sentence => sentence.id)
)

export const selectEditSentenceId = (state) => state.sentence.data.find(sentence => sentence.isEdit === true)

export const selectSentencesById = (state, sentenceId) => state.sentence.data.find(sentence => sentence.id === sentenceId)