import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener{

  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.prepare()
  }

  // настраиваем компонент
  prepare(){

  }

  // возвращаем шаблон компонента
  toHTML  (){
    return "";
  }

  // уведомляем слушателей про события ивент
  $emit(e, ...args){
    this.emitter.emit(e, ...args)
  }

  // подписываемся на ивент
  $on(e, fn){
    const unsub = this.emitter.subscribe(e, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action){
    this.store.dispatch(action)
  }

  storeChanged(changes) {

  }

  isWatching(key){
    return this.subscribe.includes(key)
  }

  // инициализируем компонент
  // добавляем дом слушатей
  init(){
    this.initDOMListeners()
  }

  // удаляем компонент
  // чистим слушатели
  destroy(){
    this.removeDOMListeners()
    this.unsubscribers.forEach(el => el())
    this.storeSub.unsub()
  }

}