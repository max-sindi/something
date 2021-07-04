import CssClass from "./CssClass"
import Unit from "./Unit"
import Media from "./Media"


export default class CssUnitClassBranch {
    private readonly property: string
    private readonly media: Media[]
    private readonly units?: Unit[]
    public readonly className: string
    public readonly classes: CssClass[]

    constructor({
        className = '',
        property = '',
        each5ValuesLimit = 0,
        px = false,
        vh = 100,
        eachValueLimit =  0,
        percent = 0,
        minus = false,
        // todo move pseudo and media  to separate js class
        after = false,
        before = false,
        media = false,
    }) {
        this.className = className
        this.property = property
        this.classes = []
        // todo units can (and should) be declared explicitly, right in Class instantiating
        this.units = [
            px && new Unit({ unit: 'px', limit: eachValueLimit, step: 1, classBranch: this, minus }),
            px && new Unit({ unit: 'px', limit: each5ValuesLimit, step: 5, classBranch: this, minus }),
            percent && new Unit({ unit: "%", prefix: "percent", limit: percent, step: 5, classBranch: this, minus }),
            percent && new Unit({ unit: "vh", prefix: "vh", limit: vh, step: 5, classBranch: this, minus: false }),
        ].filter(Boolean)

        // todo move media to separate class
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
        return `${this.property}: ${value}`
    }
}