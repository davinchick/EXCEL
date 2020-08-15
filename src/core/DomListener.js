import { capitalize } from "./utils"

export class DomListener {
  constructor($root, listeners=[]) {
    if(!$root){
      throw new Error("No root there!!")
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners(){
    console.log(this.listeners)
    this.listeners.forEach(listen => {
      const method = getMethodName(listen)
      if(!this[method]){
        throw new Error(`Method ${method} not exist in ${this.name || ''}`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listen, this[method])
    })
  }

  removeDOMListeners(){
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eName){
  return 'on' + capitalize(eName)
}