import { Page } from "../core/Page";
import { $ } from '../core/dom'
import { createRecords } from './dashboard.func'

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString()
        return $.create('div', 'db').html(`
            <div class="db__header">
                <h1>Dashboard Excel</h1>
            </div>

            <div class="db__new">
                <div class="db__view">
                    <a href="#excel/${now}" class="db__create">New <br /> table</a>
                </div>
            </div>

            <div class="db__table db__view">
                ${createRecords()}
            </div>
        `)
    }
}