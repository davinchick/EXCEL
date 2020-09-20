class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) : selector
  }
  html(html){
    if(typeof html === 'string'){
      this.$el.innerJTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  on(eType, callback){
    this.$el.addEventListener(eType, callback)
  }

  text(text){
    if(typeof text === 'string'){
      this.$el.textContent = text
      return this
    }
    if(this.$el.tagName.toLowerCase() === 'input'){
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  off(eType, callback){
    this.$el.removeEventListener(eType, callback)
  }

  clear(){
    this.html('')
    return this
  }

  find(selector){
    return $(this.$el.querySelector(selector))
  }

  append(node){
    if(node instanceof Dom){
      node = node.$el
    }
    if(Element.prototype.append){
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector){
    return $(this.$el.closest(selector))
  }

  getCoords(){
    return this.$el.getBoundingClientRect()
  }

  get data(){
    return this.$el.dataset
  }

  findAll(selector){
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}){
    Object.keys(styles).forEach(el => {
      this.$el.style[el] = styles[el]
    })
  }

  getStyles(styles = []){
    return styles.reduce((res, st) => {
      res[st] = this.$el.style[st]
      return res
    }, {})
  }

  id(parse){
    if(parse){
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  focus(){
    this.$el.focus()
    return this
  }

  attr(name, value){
    if(value){
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  addClass(className){
    this.$el.classList.add(className)
  }

  removeClass(className){
    this.$el.classList.remove(className)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if(classes){
    el.classList.add(classes)
  }
  return $(el)
}