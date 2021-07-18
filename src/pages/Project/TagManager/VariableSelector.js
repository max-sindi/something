import React from 'react'
import {observer} from 'mobx-react'
import project from '../../../mobX/project'

const VariableSelector = observer(({ project, onChange }) => {
  const variables = project.data && project.data.variables || {}
  return (
    <div>
      {Object.entries(variables).map(([name, value]) =>
        <div className="flex align-center pointer" onClick={() => onChange(value)}>
          {name}: {value}
        </div>
      )}
    </div>
  )
})

export default props => <VariableSelector {...props} project={project}/>