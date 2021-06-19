export default [
    { className: "h",           rule: "height",          media: true,  percent:      200,    each5ValuesLimit: 200, eachValueLimit: 50, px: true, vh: 100},
    { className: "max-w",       rule: "max-width",       media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, vh: 100},
    { className: "max-h",       rule: "max-height",      media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, vh: 100},
    { className: "min-w",       rule: "min-width",       media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, vh: 100},
    { className: "min-h",       rule: "min-height",      media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, vh: 100},
    { className: "p",           rule: "padding",         media: true,  percent:      200,    each5ValuesLimit: 200,  px: true},
    { className: "pl",          rule: "padding-left",    media: true,  percent:      200,    each5ValuesLimit: 200,  px: true},
    { className: "pr",          rule: "padding-right",   media: true,  percent:      200,    each5ValuesLimit: 200,  px: true},
    { className: "pt",          rule: "padding-top",     media: true,  percent:      200,    each5ValuesLimit: 200,  px: true},
    { className: "pb",          rule: "padding-bottom",  media: true,  percent:      200,    each5ValuesLimit: 200,  px: true},
    { className: "m",           rule: "margin",          media: true,  percent:      200,    each5ValuesLimit: 200,  px: true},
    { className: "ml",          rule: "margin-left",     media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true},
    { className: "mr",          rule: "margin-right",    media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true},
    { className: "mt",          rule: "margin-top",      media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true},
    { className: "mb",          rule: "margin-bottom",   media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true},
    { className: "l",           rule: "left",            media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true},
    { className: "r",           rule: "right",           media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true},
    { className: "t",           rule: "top",             media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true},
    { className: "b",           rule: "bottom",          media: true,  percent:      200,    each5ValuesLimit: 200,  px: true, minus: true},
    { className: "fz",          rule: "font-size",       media: true,  percent:      200,    eachValuesLimit: 50,     px: true},
    { className: "t-a",         rule: "top",             media: true,  value: "auto"},
    { className: "border-radius", rule: "border-radius",                                      eachValuesLimit: 10,  px: true},
    { className: "ml-a",        fast: "margin-left: auto",     media: true},
    { className: "mr-a",        fast: "margin-right: auto",    media: true},
    {
        className: mdf => `d-${mdf}`,
        rules: [
            'none', 'flex', 'flex-inline', 'block', 'inline', 'inline-block'
        ]},
    // flex align
    {
        className: mdf => `align-${mdf}`,
        rules: [
            'center',
            {name: 'start', rule: 'flex-start'},
            {name: 'end', rule: 'flex-end'},
        ]},
    // flex justify
    { className: mdf => `justify-${mdf}`, rules: [
            'center',
            {name: 'between', rule: 'space-between'},
            {name: 'around', rule: 'space-around'}
        ]},
    // position states
    { className: mdf => mdf, rules: [
            'fixed', 'relative', 'absolute', 'static'
        ]},
    // text aligns
    { className: mdf => `text-${mdf}`, rules: [
            'center', 'left', 'right'
        ]},
    { className: 'grow', rule: 'flex-grow', eachValuesLimit: 5 },
    { className: "flex-wrap",        fast: "flex-wrap: wrap",      media: true},
    { className: "flex-center",  fast: "justify-content: center; align-items: center" },

    { classNames: mdf => ``},
    { className: "pre-wrap",    fast: "white-space: pre-wrap" },
    { className: "text-wrap",    fast: "white-space: wrap", media: true },
    { className: "text-no-wrap",    fast: "white-space: nowrap", media: true },
    { className: "bold",        fast: "font-weight: 700" },
    { className: "pointer",        fast: "cursor: pointer" },
    { className: "fw-bold",     fast: "font-weight: 700" },
    { className: "ls-027",      fast: "letter-spacing: 0.27px" },
    { className: "ls-05",       fast: "letter-spacing: 0.54px" },
    { className: "z-index",     rule: "z-index",         media: true, eachValuesLimit: 40, minus: true, percent: false },
    { className: "order",       rule: "order",           media: true,  eachValuesLimit: 10, percent: false, after: false, before: false}, // other..
    // { className: "text-grey",   fast: "color: #666" },
    { className: "transform-left-top-center",     fast: "transform: translate(-50%, -50%)" },  // both edges
    { className: "transform-right-top-center",    fast: "transform: translate(50%, -50%)" }, // useful transform values
    { className: "transform-left-bottom-center",  fast: "transform: translate(-50%, 50%)" },
    { className: "transform-right-bottom-center", fast: "transform: translate(50%, 50%)" },
    { className: "transform-right-center", fast: "transform: translateX(50%)"  },  // edges center
    { className: "transform-left-center", fast: "transform: translateX(-50%)"  },
    { className: "transform-top-center", fast: "transform: translateY(-50%)"   },
    { className: "transform-bottom-center", fast: "transform: translateY(50%)" },
    { className: "scale-75-p", fast: "transform: scale(0.75)", media: true },
    { className: "t-a", fast: "top: auto" },
    { className: "l-a", fast: "left: auto", media: true },

    /* special */
    { className: 'container', fast: 'max-width: 1200px; width: 100%; margin-left: auto; margin-right: auto; padding-left: 30px; padding-right: 30px'}
];