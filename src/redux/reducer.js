import { TABLE_RESIZE, CHANGE_TEXT } from "./types"

// pure function
export function rootReducer(state, action){
    let prevState
    let field
    switch(action.type){
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState} // column id, value
        case CHANGE_TEXT:
            return {...state, currentText: action.data.value}
        default: return state
    }
}