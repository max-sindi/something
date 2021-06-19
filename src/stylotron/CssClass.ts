export default class CssClass {
    name: string
    value: string

    constructor({ name = '!noName!', value = '!noValue!' }) {
        this.name = name;
        this.value = value;
    }
}