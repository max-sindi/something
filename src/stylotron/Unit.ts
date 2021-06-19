import CssClassBranch from "./CssClassBranch"
import CssClass from "./CssClass"

export default class Unit {
    unit: string
    limit: number
    minus: boolean
    classBranch: CssClassBranch
    prefix?: string
    step: number

    constructor({
        unit = "!noUnit!",
        prefix = "",
        limit = 1000,
        step = 1,
        classBranch,
        minus
    }) {
        this.unit = unit
        this.prefix = prefix
        this.limit = limit
        this.step = step
        this.minus = minus
        this.classBranch = classBranch
    }

    createClassName(integer: number, minus = false) {
        const prefixes = [
            this.prefix,
            minus && 'minus'
        ].filter(Boolean)

        const prefix = !prefixes.length ? '' : '-' + prefixes.join('-')
        const name = `${this.classBranch.className}-${integer}${prefix}`
        const value = this.classBranch.createValue(
         `${   integer * (minus ? -1 : 1)}` // - or +
            +
            `${integer !== 0 ? this.unit : ''}` // skip redundant unit for 0 position
        )
        return new CssClass({ name, value })
    }

    populateClasses() {
        for (let value = 0; value <= this.limit; value += this.step) {
            // create positive values
            this.classBranch.classes.push(this.createClassName(value))
            // create negative values
            this.minus && this.classBranch.classes.push(this.createClassName(value, true))
        }
    }
}