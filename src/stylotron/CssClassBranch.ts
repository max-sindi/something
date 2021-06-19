import CssClass from "./CssClass"
import Unit from "./Unit"
import Media from "./Media"


export default class CssClassBranch {
    public className: string
    public rule: string
    public classes: CssClass[]
    public media: Media[]
    public percent: number
    public units: Unit[]

    constructor({
        className = '',
        rule = '',
        media = false,
        each5ValuesLimit = 0,
        px = false,
        vh = 100,
        eachValueLimit =  0,
        percent,
        minus
    }) {
        this.className = className
        this.percent = percent
        this.rule = rule
        this.classes = []
        this.units = [
            px && new Unit({ unit: 'px', limit: each5ValuesLimit, step: 5, classBranch: this, minus }),
            px && new Unit({ unit: 'px', limit: eachValueLimit, step: 1, classBranch: this, minus }),
            percent && new Unit({ unit: "%", prefix: "percent", limit: percent, step: 5, classBranch: this, minus })
        ].filter(Boolean)
        this.media = !media ? [] : [
            new Media(400),
            new Media(700),
        ]

        this.populateUnits()
    }

    populateUnits(): void {
        this.units.forEach(unit => {
            unit.populateClasses()
        })
    }

    createValue(value: string): string {
        return `${this.rule}: ${value}`
    }
}