import React, {useMemo} from 'react'
import {observer} from 'mobx-react'
import project from '../../mobX/project'
import ObjectEditor from './TagManager/ObjectEditor'
import _ from 'lodash'

const Variables = observer(({ project, ...props }) => {
  const variables = project.data && project.data.variables
  const [localState, setLocalState] = React.useState(null)
  const onChangeMemo = useMemo(
    () => updater => project.updateVariables(_.isFunction(updater) ? updater(variables) : updater),
    []
  )

  React.useEffect(() => {
    !localState && setLocalState(variables)
  }, [variables])

  return (
    <div className={``}>
      {localState && (
        <ObjectEditor
          enableCreating
          value={localState}
          onChange={updater => {
            setLocalState(updater)
            onChangeMemo(updater)
          }}
      />)}
    </div>
  )
})

export default props =>  <Variables {...props} project={project} />