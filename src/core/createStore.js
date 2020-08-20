export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let listeners = []
    
    return {
        subscribe(fn){
            listeners.push(fn)
            return {
                unsubscribe(){
                    listeners = listeners.filter(l => l!== fn)
                }
            }
        },
        dispatch(action){
            state = rootReducer(sate, action)
            listeners.forEach(el => el(state))
        },
        getState(){
            return JSON.parse(JSON.stringify(state))
        }
    }
}