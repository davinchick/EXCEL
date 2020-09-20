import { ExcelComponent } from "../../core/ExcelComponent"
import { $ } from "../../core/dom"
import {changeTitle} from '../../redux/actions'
import { defaultTitle } from '../../constants'
import { debounce } from "../../core/utils"
import { ActiveRoute } from "../../core/routes/ActiveRoute"

export class Header extends ExcelComponent{
  static className = "excel__header"

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  toHTML  (){
    const title = this.store.getState().title || defaultTitle
    return `<input type="text" value="${title}" class="input" />
            <div class="">
                <div class="button" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>
                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div>
            `;
  }

  prepare(){
    this.onInput = debounce(this.onInput, 300)
  }

  onClick(e) {
    const $target = $(e.target)
    if($target.data.button === 'remove'){
      const decition = confirm('Are U sure to delete this table?')
      if(decition){
       localStorage.removeItem('excel:' = ActiveRoute.param)
       ActiveRoute.navigate('') 
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onInput(e){
    const target = $(e.target)
    this.$dispatch(changeTitle(target.text()))
  }
}