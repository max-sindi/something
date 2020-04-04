const fs = require('fs')

const classNames = [
  { className: "w",           rule: "width",           media: true,  percent:      true,    each5Values: true,  px: true},
  { className: "h",           rule: "height",          media: true,  percent:      true,    each5Values: true,  px: true},
  { className: "max-w",       rule: "max-width",       media: true,  percent:      true,    each5Values: true,  px: true},
  { className: "max-h",       rule: "max-height",      media: true,  percent:      true,    each5Values: true,  px: true},
  { className: "min-w",       rule: "min-width",       media: true,  percent:      true,    each5Values: true,  px: true},
  { className: "min-h",       rule: "min-height",      media: true,  percent:      true,    each5Values: true,  px: true},
  { className: "p",           rule: "padding",         media: true,  percent:      true,    each5Values: true,  px: true, minus: false},
  { className: "pl",          rule: "padding-left",    media: true,  percent:      true,    each5Values: true,  px: true, minus: false},
  { className: "pr",          rule: "padding-right",   media: true,  percent:      true,    each5Values: true,  px: true, minus: false},
  { className: "pt",          rule: "padding-top",     media: true,  percent:      true,    each5Values: true,  px: true, minus: false},
  { className: "pb",          rule: "padding-bottom",  media: true,  percent:      true,    each5Values: true,  px: true, minus: false},
  { className: "m",           rule: "margin",          media: true,  percent:      true,    each5Values: true,  px: true, minus: false},
  { className: "ml",          rule: "margin-left",     media: true,  percent:      true,    each5Values: true,  px: true, minus: true},
  { className: "mr",          rule: "margin-right",    media: true,  percent:      true,    each5Values: true,  px: true, minus: true},
  { className: "mt",          rule: "margin-top",      media: true,  percent:      true,    each5Values: true,  px: true, minus: true},
  { className: "mb",          rule: "margin-bottom",   media: true,  percent:      true,    each5Values: true,  px: true, minus: true},
  { className: "l",           rule: "left",            media: true,  percent:      true,    each5Values: true,  px: true, minus: true},
  { className: "r",           rule: "right",           media: true,  percent:      true,    each5Values: true,  px: true, minus: true},
  { className: "t",           rule: "top",             media: true,  percent:      true,    each5Values: true,  px: true, minus: true},
  { className: "b",           rule: "bottom",          media: true,  percent:      true,    each5Values: true,  px: true, minus: true},
  { className: "fz",          rule: "font-size",       media: true,  percent:      false,   eachValues: 50,  px: true},
  { className: "border-radius", rule: "border-radius",   eachValues: 10,  px: true},
  { className: "t-a",         rule: "top",             media: true,  percent:      false,   value: "auto"},
  { className: "ml-a",        fast: "margin-left: auto",     media: true, percent:      false,},
  { className: "mr-a",        fast: "margin-right: auto",    media: true, percent:      false,},
  { className: "d-none",       fast: "display: none",      media: true},
  { className: "d-block",      fast: "display: block",    media: true},
  { className: "d-flex",      fast: "display: flex",    media: true},
  { className: "flex",        fast: "display: flex",      media: true},
  { className: "flex-wrap",        fast: "flex-wrap: wrap",      media: true, after: false, before: false, percent: false, minus: false},
  { className: "text-right",  fast: "text-align: right" },
  { className: "text-left",   fast: "text-align: left" },
  { className: "text-center", fast: "text-align: center" },
  { className: "pre-wrap",    fast: "white-space: pre-wrap" },
  { className: "text-wrap",    fast: "white-space: wrap", media: true },
  { className: "text-no-wrap",    fast: "white-space: nowrap", media: true },
  { className: "bold",        fast: "font-weight: 700" },
  { className: "fw-bold",     fast: "font-weight: 700" },
  { className: "ls-027",      fast: "letter-spacing: 0.27px" },
  { className: "ls-05",       fast: "letter-spacing: 0.54px" },
  { className: "z-index",     rule: "z-index",         media: true, eachValues: 40, minus: true, percent: false },
  { className: "order",       rule: "order",           media: true,  eachValues: 10, percent: false, after: false, before: false}, // other..
  { className: "text-grey",   fast: "color: #666" },
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
];

const mediaConfig = [
  { name: 'lg', p: '1440', result: '' },
  { name: 'mlg', p: '1100', result: '' },
  { name: 'md', p: '768' , result: '' },
  { name: 'smd', p: '580' , result: '' },
  { name: 'sm', p: '411' , result: '' },
];



let result = ''
let mediaResult = {
  lg: ``,
  md: ``,
  sm: ``,
}

classNames.forEach(({ className, rule, fast, media = true, each5Values = false, eachValues = false, px = false, minus = false, percent = false, value, after = true, before = true }) => {
  let cls = className


  const populateResultWithStatement = (({ cls, fast, value, minus = false, measure = '' }) => result += '\n' +
    `.${cls}{${fast ? fast : `${rule}: ${minus ? '-' : ''}${value}${measure}`}}`
  );

   // @media (max-width: ${media.p}px) {
  // media fast? need to refactor
  const populateMediaResultWithStatement = (({ cls, value, media, minus = false, measure = '' }) =>  mediaResult[media.name] += '\n' +
    `.${cls}{${fast ? fast : `${rule}: ${minus ? '-' : ''}${value}${measure}`}}`
  );

  if(fast) {
    populateResultWithStatement({ cls, fast });
    prefixes({ cls, fast})
  }

  if(each5Values) {
    for(let i = 0; i < 550; i++) {
      if(i % 5 !== 0) continue;
      populateResultWithStatement({ cls: `${cls}-${i}`, value: i, measure: 'px' });
      suffixes({ cls: `${cls}-${i}`, value: i, measure: 'px'}, prefixes);
    }
  }

  if(eachValues) {
    for(let i = 0; i <= eachValues; i++) {
      populateResultWithStatement({ cls: `${cls}-${i}`, value: i, measure: px ? 'px' : '' })
      suffixes({ cls: `${cls}-${i}`, value: i, measure: px ? 'px' : '' }, prefixes);
    }
  }

  function suffixes({ cls, value, ...args }, next) {

    runPercent({ cls, value, ...args });
    runMinus({ cls, value, ...args });
    next({ cls, value, ...args });

    function runPercent({ cls, value, ...args }) {
      if(percent) {
        populateResultWithStatement({ cls: `${cls}-p`, value: value, ...args, measure: '%'})
        next({ cls: `${cls}-p`,  value, ...args, measure: '%'})
        runMinus({ cls: `${cls}-p`,  value, ...args, measure: '%'})
      }
    }

    function runMinus({ cls, value, ...args}) {
      if(minus) {
        populateResultWithStatement({ cls: `${cls}-minus`, value, minus: true, ...args})
        next({ cls: `${cls}-minus`, value, minus: true, ...args})
      }
    }
  }

  function prefixes({ cls, value, ...args }) {
    decorators({ cls, value, ...args })
    media({ cls, value, ...args });

    function decorators({ cls, value, ...args }) {
      // if no one decor
      if(!(after || before)) {
        return;
      }

      if(before) {
        populateResultWithStatement({ cls: `decorator-${cls}:before`, value, ...args })
        media({ cls: `decorator-${cls}:before`, value, ...args })
      }
      if(after) {
        populateResultWithStatement({ cls: `decorator-alter-${cls}:after`, value, ...args })
        media({ cls: `decorator-alter-${cls}:after`, value, ...args })
      }
    }

    function media({ cls, value, ...args }) {
      mediaConfig.forEach(br =>
        populateMediaResultWithStatement({ cls: `${br.name}-${cls}`, value: value, media: br, ...args})
      )
    }
  }
})

const media = mediaConfig.map(m => `\n @media (max-width:${m.p}px){${ mediaResult[m.name] }}`).join('\n')


fs.writeFileSync(
  './_styles.css',
  (result + media) // persist true order: non-media then media
);