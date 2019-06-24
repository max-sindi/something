import React from 'react'

class Dashboard extends React.Component {

  getRandomGraph = () => {
    function generateRandomData() {
      return []
    }
    class RandomGraph extends React.Component {
      state = {
        data: generateRandomData()
      }


      render() {
        return (
          <div></div>
        )
      }
    }

    return RandomGraph
  }

  render() {
    const RandomGraph = this.getRandomGraph();
    return (
      <div>
        <RandomGraph></RandomGraph>
      </div>
    )
  }
}

export default Dashboard