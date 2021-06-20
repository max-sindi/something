import CssClass from "./CssClass"
import * as _ from "lodash"

export default class CssSimpleClassBranch {
    private readonly fast: string
    private readonly property: string
    private readonly classNameCreator: (string) => string
    private readonly values: string[] | undefined
    private readonly media: []
    public readonly className: string
    public readonly classes: CssClass[]

    constructor({
        className = '',
        fast = '',
        property = '',
        values = undefined,
        media = false,
        classNameCreator = undefined
    }) {
        this.className = className
        this.fast = fast
        this.property = property
        this.values = values
        this.classNameCreator = classNameCreator
        this.classes = []

        this.populateEnumerates()
        this.populateFast()
    }

    populateEnumerates(): void {
        if(_.isFunction(this.classNameCreator) && _.isArray(this.values)) {
            this.values.forEach(value =>
                this.classes.push(new CssClass({
                    name: this.classNameCreator(value),
                    value: this.createValue(value)
                }))
            )
        }
    }

    populateFast(): void {
        if(this.fast) {
            this.classes.push(new CssClass({
                name: this.className,
                value: this.fast
            }))
        }
    }

    createValue(value: string): string {
        return `${this.property}: ${value}`
    }


}