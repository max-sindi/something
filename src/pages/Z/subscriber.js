export default {
  subscribe() {
    return {
      template: [{
        tag: 'div',
        children: [
          'inline text example',
          {
            tag: 'div',
            children: "it's end"
          },
        ]
      }]
    }
  }

}