import React from 'react'
import {observer} from 'mobx-react'
import project from '../../mobX/core'

const FileSelector = observer(({ project, onChange }) => {
  return (
    <div>
      {project.project.files.map(fileName => (
        <div
          className={`flex pointer m-5`}
          onClick={() => onChange(fileName)}
          key={fileName}
        >
          {fileName}
          <img src={`http://localhost:8000/${fileName}`} alt="" width={40} height={30}/>
        </div>
      ))}
    </div>
  )
})

export default props => <FileSelector {...props} project={project} />