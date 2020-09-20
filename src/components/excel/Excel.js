import {$} from '@core/dom'
import { Emitter } from "../../core/Emitter"
import { StoreSubscribe } from '../../core/storeSubscriber';
import { updateDate } from '../../redux/actions'
import { preventDefault } from '../../core/utils'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscribe(this.store)
  }

  getRoot(){
      const $root = $.create("div", "excel");
      const componentOptions = {
        emitter: this.emitter,
        store: this.store
      }
      this.components.map(Compon => {
        // debugger
        const $el =  $.create("div", Compon.className);
        const component = new Compon($el, componentOptions);

        $el.html(component.toHTML());
        $root.append($el)
        return component
      })

      return $root
  }

  init(){
    console.log(process.env.NODE_ENV)
    if(process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(compon => compon.init())
  }

  destroy(){
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(el => el.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}