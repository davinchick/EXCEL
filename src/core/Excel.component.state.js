import { ExcelComponent } from "./ExcelComponent";

export class ExcelComponentState extends ExcelComponent {
    constructor(...args){
        super(...args)
    }

    get template(){
        return JSON.stringify(this.state, null, 2)
    }

    initState(initState){
        this.state = {...initState}
    }

    setState(newState){
        this.state = {...this.this.state, ...newState}
        this.$root.html(this.template)
    }
}