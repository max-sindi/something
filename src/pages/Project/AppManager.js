import React from 'react'
import PropTypes from 'prop-types'
import Variables from './Variables'
// import Dropzone from "../../../components/Dropzone"
// import {observer} from "mobx-react"
// import project from "../../mobX/project"
// import popup from '../../mobX/popup'


class AppManager extends React.Component {
  static propTypes = {
    currentState: PropTypes.object,
  }

  uploadFilesClickHandler = (fileFormData) => {
      const data = new FormData()
      data.append('file', fileFormData.value)
      this.props.project.loadAsset(data)
  }

  render() {
    return (
      <div className={'app-manager pt-20 pb-20'}>
        <form action="http://localhost:8000/api/z/asset" method="post" encType="multipart/form-data">
          <input type="file" name="asset" multiple={true}/>
          <input type="submit"/>

        </form>
        <Variables />
      </div>
    )
  }
}

export default AppManager
