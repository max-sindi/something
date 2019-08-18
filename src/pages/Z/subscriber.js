export default {
  subscribe() {
    return {
      template: [{
        tag: 'div',
        classNames: '',
        children: [
          'inline text example',
          {
            tag: 'div',
            children: ["it's end"]
          },
        ]
      }],
      css: [{
        name: 'global',
      }]
    }
  },
  save(state) {
    return new Promise((res, rej) =>  {
      setTimeout(() => res(state), 400)
    })
  }
}