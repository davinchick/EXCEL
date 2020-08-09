import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || []
  }

  getRoot(){
      const $root = $.create("div", "excel");

      this.components.map(Compon => {
        // debugger
        const $el =  $.create("div", Compon.className);
        const component = new Compon($el);
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
}