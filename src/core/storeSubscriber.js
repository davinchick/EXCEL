import {isEqual} from './utils'

export class StoreSubscribe {
    constructor(store) {
        this.store = store
        this.sub = null
        this.prevState = {}
    }

    subscribeComponents(compons) {
        this.prevState = this.store.getState()

        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if(!isEqual(this.prevState[key], state[key])){
                    compons.forEach(el => {
                        if(el.isWatching(key)){
                            const changes = {[key]: state[key]}
                            el.storeChanged(changes)
                        }
                    })
                }
            })
            this.prevState = this.store.getState()

            if( process.env.NODE_ENV === 'development') {
                window['redux'] = this.prevState
            }
        })
    }

    unsubscribeFromStore() {
        this.sub.unsub()
    }
}