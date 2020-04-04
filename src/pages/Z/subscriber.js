import axios from 'axios'

export default class Z {
  constructor({api}) {
    this.api = api
  }

  subscribe = () => {
    return {
      template: this.template,
      css: [{
        name: 'global',
      }]
    }
  };

  update = (state) => this.api.update(state)

  get template() {
      return [{
        tag: 'div',
        className: 'first-child',
        children: [
          'inline text example',
          {
            tag: 'div',
            children: ["it's end"]
          },
        ]
      }];
    }
    // return axios.get('http://localhost:8000/api/z/template').then(res => console.log(res))
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