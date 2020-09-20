export function capitalize(str){
  if(typeof str !== 'string'){
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function range(start, end){
  if(start > end){
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
    .fill('')
    .map((_, i) => start + i)
}

export function storage(key, data){
  if(!data){
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if(typeof a === 'object' && typeof b === 'object'){
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelCase(str){
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function stylesToString(styles = {}){
  return Object.keys(styles)
      .map(key => `${camelCase(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, ms){
  let timeout
  return function(...args){
    const later = () => { 
      clearTimeout(timeout); 
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export const preventDefault = (e) => {
  e.preventDefault()
}