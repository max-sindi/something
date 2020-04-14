import axios from 'axios'

export default class Z {
  constructor({api}) {
    this.api = api
  }

  getCurrentState = () => {
    return this.api.update
  }

  update = (state) => this.api.update(state)

  // get template() {
  //     return [{
  //       tag: 'div',
  //       className: 'first-child',
  //       children: [
  //         'inline text example',
  //         {
  //           tag: 'div',
  //           children: ["it's end"]
  //         },
  //       ]
  //     }];
  //   }
  //   // return axios.get('http://localhost:8000/api/z/template').then(res => console.log(res))
  // }
  //   return [{
  //     tag: 'div',
  //     className: 'first-child',
  //     children: [
  //       'inline text example',
  //       {
  //         tag: 'div',
  //         children: ["it's end"]
  //       },
  //     ]
  //   }];
  // }
}