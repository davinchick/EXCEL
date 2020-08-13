export class Emitter {
  constructor(){
    this.listeners = {}
  }

  emit(eName, ...args){
    if(!Array.isArray(this.listeners[eName])){
      return false
    }
    this.listeners[eName].forEach(el => {
      el(...args)
    })
    return true
  }

  subscribe(eName, fn){
    this.listeners[eName] = this.listeners[eName] || []
    this.listeners[eName].push(fn)
    return () => {
      this.listeners[eName] = this.listeners[eName].filter(el => el !== fn)
    }
  }
}