import {$} from '@core/dom'
import { Emitter } from "../../core/Emitter"
import { StoreSubscribe } from '../../core/storeSubscriber';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
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

  render(){
    this.$el.append(this.getRoot())

    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(compon => compon.init())
  }

  destroy(){
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(el => el.destroy())
  }
}