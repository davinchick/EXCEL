import { ExcelComponent } from "../../core/ExcelComponent"
import { createTable } from './table.template'
import { tableResizeHandles } from "./table.resize"
import { isCell, matrix, nextSelector, shouldResize } from "./table.functions"
import { TableSelection } from "./TableSelection"
import { $ } from "../../core/dom"
import * as actions from '../../redux/actions'

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML  (){
    return createTable(20, this.store.getState())
  }

  prepare(){
    this.selection = new TableSelection()
  }

  init(){
    super.init()
    const cell = this.$root.find('[data-id="0:0"]')
    this.selectCell(cell)

    this.$on('tableInit', text => {
      // this.selection.current.text(text)
      this.updateTextinStore(text)
      console.log(text)
    })

    this.$on('doneee', () => {
      this.selection.current.focus()
    })
    // this.$subscribe(state => {
    //   console.log(state)
    // })
  }

  selectCell(cell){
    this.selection.select(cell)
    this.$emit('tableSelect', cell)
  }

  async resizeTable(e){
    try{
      const data = await tableResizeHandles(this.$root, e)
      this.$dispatch(actions.tableResize(data))
      console.log(data, 'async data')
    } catch(e) {
      console.warn(e.message)
    }
  }

  onMouseDown(e){
    if(shouldResize(e)){
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if(e.shiftKey){
        const clicked = $target.id(true)
        const current = this.selection.current.id(true)

        const cells = matrix(clicked, current)
          .map(id => this.$root.find(`[data-id="${id}"`))

        this.selection.selectGroup(cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(e){
    const keys = ['Enter', 'Tab', "ArrowLeft", 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const {key} = e
    if(keys.includes(key) && !e.shiftKey){
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextinStore(value){
    this.$dispatch(action.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(e){
    this.updateTextinStore($(e.target).text())
  }
}