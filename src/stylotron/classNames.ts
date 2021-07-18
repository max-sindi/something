import CssUnitClassBranch from "./CssUnitClassBranch"
import CssSimpleClassBranch from "./CssSimpleClassBranch"

const classNames = [
    new CssSimpleClassBranch({ className: 'container', fast: 'max-width: 1200px; width: 100%; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px'}),
    new CssUnitClassBranch({ className: "w",           property: "width",           media: true,  percent:      200,    each5ValuesLimit: 400, eachValueLimit: 50, px: true, vh: 100}),
    new CssUnitClassBranch({ className: "h",           property: "height",          media: true,  percent:      200,    each5ValuesLimit: 200, eachValueLimit: 50, px: true, vh: 100}),
    new CssUnitClassBranch({ className: "max-w",       property: "max-width",       media: true,  percent:      200,    each5ValuesLimit: 800,  px: true, vh: 100}),
    new CssUnitClassBranch({ className: "max-h",       property: "max-height",      media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, vh: 100}),
    new CssUnitClassBranch({ className: "min-w",       property: "min-width",       media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, vh: 100}),
    new CssUnitClassBranch({ className: "min-h",       property: "min-height",      media: true,  percent:      200,    each5ValuesLimit: 700,  px: true, vh: 100}),
    new CssUnitClassBranch({ className: "p",           property: "padding",         media: true,  percent:      200,    each5ValuesLimit: 200,  px: true}),
    new CssUnitClassBranch({ className: "pl",          property: "padding-left",    media: true,  percent:      200,    each5ValuesLimit: 200,  px: true}),
    new CssUnitClassBranch({ className: "pr",          property: "padding-right",   media: true,  percent:      200,    each5ValuesLimit: 200,  px: true}),
    new CssUnitClassBranch({ className: "pt",          property: "padding-top",     media: true,  percent:      200,    each5ValuesLimit: 200,  px: true}),
    new CssUnitClassBranch({ className: "pb",          property: "padding-bottom",  media: true,  percent:      200,    each5ValuesLimit: 200,  px: true}),
    new CssUnitClassBranch({ className: "m",           property: "margin",          media: true,  percent:      200,    each5ValuesLimit: 200,  px: true}),
    new CssUnitClassBranch({ className: "ml",          property: "margin-left",     media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true}),
    new CssUnitClassBranch({ className: "mr",          property: "margin-right",    media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true}),
    new CssUnitClassBranch({ className: "mt",          property: "margin-top",      media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true}),
    new CssUnitClassBranch({ className: "mb",          property: "margin-bottom",   media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true}),
    new CssUnitClassBranch({ className: "l",           property: "left",            media: true,  percent:      200,    each5ValuesLimit: 200, eachValueLimit: 15,  px: true, minus: true}),
    new CssUnitClassBranch({ className: "r",           property: "right",           media: true,  percent:      200,    each5ValuesLimit: 200, eachValueLimit: 15,  px: true, minus: true}),
    new CssUnitClassBranch({ className: "t",           property: "top",             media: true,  percent:      200,    each5ValuesLimit: 200, eachValueLimit: 15,  px: true, minus: true}),
    new CssUnitClassBranch({ className: "b",           property: "bottom",          media: true,  percent:      200,    each5ValuesLimit: 200, eachValueLimit: 15,  px: true, minus: true}),
    new CssUnitClassBranch({ className: "fz",          property: "font-size",       media: true,  percent:      200,    eachValueLimit: 50,     px: true}),
    new CssUnitClassBranch({ className: "border-radius", property: "border-radius", eachValueLimit: 10,     px: true}),
    new CssUnitClassBranch({ className: "border-width", property: "border-width", eachValueLimit: 10,     px: true}),
    new CssUnitClassBranch({ className: "lh", property: "line-height", eachValueLimit: 100,     px: true}),
    new CssUnitClassBranch({ className: "z-index",     property: "z-index",         media: true,                        eachValueLimit: 40,     minus: true }),
    new CssUnitClassBranch({ className: "order",       property: "order",           media: true,                        eachValueLimit: 10,     after: false, before: false}),

    new CssSimpleClassBranch({ className: "t-a",         fast: "top: auto",             media: true }),
    new CssSimpleClassBranch({ className: "ml-a",        fast: "margin-left: auto",     media: true }),
    new CssSimpleClassBranch({ className: "mr-a",        fast: "margin-right: auto",    media: true }),
    new CssSimpleClassBranch({
        property: "display",
        classNameCreator: mdf => `d-${mdf}`,
        values: [ 'none', 'flex', 'inline-flex', 'block', 'inline', 'inline-block' ]
    }),
    new CssSimpleClassBranch({
        property: "align-items",
        classNameCreator: mdf => `align-${mdf}`,
        values: ['center', 'flex-start', 'flex-end']
    }),
    new CssSimpleClassBranch({
        property: "justify-content",
        classNameCreator: mdf => `justify-${mdf}`,
        values: [ 'center', 'space-between', 'space-around' ]
    }),
    new CssSimpleClassBranch({
        property: "position",
        classNameCreator: mdf => mdf,
        values: [
            'fixed', 'relative', 'absolute', 'static'
        ]
    }),
    new CssSimpleClassBranch({
        property: "border-style",
        classNameCreator: mdf => mdf,
        values: [
            'solid', 'dashed'
        ]
    }),
    new CssSimpleClassBranch({
        property: "text-align",
        classNameCreator: mdf => `text-${mdf}`,
        values: [
            'center', 'left', 'right'
        ]
    }),
    new CssSimpleClassBranch({
        className: "bg-cover",
        fast: "background-size: cover"
    }),
    new CssSimpleClassBranch({
        property: 'flex-grow',
        classNameCreator: mdf => `grow-${mdf}`,
        values: ['1', '2', '3']
    }),
    new CssSimpleClassBranch({ className: "flex-wrap",        fast: "flex-wrap: wrap",      media: true}),
    new CssSimpleClassBranch({ className: "flex",        fast: "display: flex",      media: true}),
    new CssSimpleClassBranch({ className: "flex-center",  fast: "justify-content: center; align-items: center" }),
    new CssSimpleClassBranch({ className: "pre-wrap",    fast: "white-space: pre-wrap" }),
    new CssSimpleClassBranch({ className: "text-wrap",    fast: "white-space: wrap", media: true }),
    new CssSimpleClassBranch({ className: "text-no-wrap",    fast: "white-space: nowrap", media: true }),
    new CssSimpleClassBranch({ className: "bold",        fast: "font-weight: 700" }),
    new CssSimpleClassBranch({ className: "pointer",        fast: "cursor: pointer" }),
    // new CssSimpleClassBranch({ className: "fw-bold",     fast: "font-weight: 700" }),
    // new CssSimpleClassBranch({ className: "ls-027",      fast: "letter-spacing: 0.27px" }),
    // new CssSimpleClassBranch({ className: "ls-05",       fast: "letter-spacing: 0.54px" }),
    // new CssSimpleClassBranch({ className: "transform-left-top-center",     fast: "transform: translate(-50%, -50%)" }),  // both edges
    // new CssSimpleClassBranch({ className: "transform-right-top-center",    fast: "transform: translate(50%, -50%)" }), // useful transform values
    // new CssSimpleClassBranch({ className: "transform-left-bottom-center",  fast: "transform: translate(-50%, 50%)" }),
    // new CssSimpleClassBranch({ className: "transform-right-bottom-center", fast: "transform: translate(50%, 50%)" }),
    // new CssSimpleClassBranch({ className: "transform-right-center", fast: "transform: translateX(50%)"  }),  // edges center
    // new CssSimpleClassBranch({ className: "transform-left-center", fast: "transform: translateX(-50%)"  }),
    // new CssSimpleClassBranch({ className: "transform-top-center", fast: "transform: translateY(-50%)"   }),
    // new CssSimpleClassBranch({ className: "transform-bottom-center", fast: "transform: translateY(50%)" }),
    // new CssSimpleClassBranch({ className: "scale-75-p", fast: "transform: scale(0.75)", media: true }),
    new CssSimpleClassBranch({ className: "t-a", fast: "top: auto" }),
    new CssSimpleClassBranch({ className: "l-a", fast: "left: auto", media: true }),

    /* special */
    new CssSimpleClassBranch({
        className: 'color-white',
        fast: `color: white`
    }),
    new CssSimpleClassBranch({
        className: 'ff-primary',
        fast: `font-family: "Maitree"`
    }),
    new CssSimpleClassBranch({
        className: 'ff-secondary',
        fast: `font-family: "Raleway"`
    }),
    new CssSimpleClassBranch({
        className: 'black',
        fast: `color: #111`
    }),
    new CssSimpleClassBranch({
        className: "flex-column",
        fast: "flex-direction: column"
    }),
    new CssSimpleClassBranch({
        classNameCreator: mdf => `fw-${mdf}`,
        property: `font-weight`,
        values: ['300', '400', '500', '600', '700', '800', '900']
    }),
    new CssSimpleClassBranch({
        classNameCreator: mdf => mdf,
        property: `text-transform`,
        values: ['capitalize', 'uppercase']
    }),
];

export default classNames