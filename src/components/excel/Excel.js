import {$} from '@core/dom'
import { Emitter } from "../../core/Emitter"

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot(){
      const $root = $.create("div", "excel");
      const componentOptions = {
        emitter: this.emitter
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

    this.components.forEach(compon => compon.init())
  }

  destroy(){
    this.components.forEach(el => el.destroy())
  }
}