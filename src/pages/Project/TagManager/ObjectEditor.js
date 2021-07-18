import React from 'react'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import FileSelector from './FileSelector'
import {FaRegWindowClose} from 'react-icons/fa'
import VariableSelector from './VariableSelector'
import _ from 'lodash'

// { name: '', withFile: false, fileValueCreator }
const ObjectEditor = ({
  fields = [],
  value = {},
  onChange,
  title = "",
  enableCreating = false
}) => {
    const [newField, setNewField] = React.useState('')
    const onAddFieldClick = () => {
      onChange(old => ({...old, [newField]: ''})) // add field
      setNewField('') // reset
    }
    const onNewFieldSelect = ({ target: {value: fieldValue}}) => onChange({
      ...value,
      [fieldValue]: value[fieldValue] || ''
    })

  return (
        <div className={`flex align-center flex-wrap`}>
            <div className={`w-100-p`}>______________________________________</div>
            <div className={`w-100 bold mb-5 mr-15 fz-20`}>{title}</div>
            <div className={`flex flex-column align-flex-start`}>
                {Object.entries(value)
                  .map(([name]) => {
                    const custom = !fields.map(i => i.name).includes(name)
                    return ({
                      ...(custom ? {} : fields.find((field) => name === field.name)),
                      name,
                      custom,
                    })
                  })
                  .map(({
                     name = '',
                     withFile = false,
                     fileValueCreator = value => value,
                      withVariable = false,
                      variableValueCreator = value => value,
                      textable = false,
                      custom = false
                 }) => {
                    const fieldValue = value[name] || ''
                    const onFileChange = fileName => onChange({
                        ...value,
                        [name]: fileValueCreator(fileName)
                    })
                    const onVariableChange = variableName => onChange({
                        ...value,
                        [name]: variableValueCreator(variableName)
                    })

                    const onFieldChange = ({ target: {value: fieldValue} }) =>
                      onChange({...value, [name]: fieldValue})

                    const _delete = () => {
                        const clone = {...value}
                        delete clone[name]
                        onChange(clone)
                    }

                    const onFieldSelect = ({ target: { value: fieldName }}) => {
                        const clone = {...value}
                        clone[fieldName] = clone[name]
                        delete clone[name]
                        onChange(clone)
                    }

                    return (
                      <div key={name} className={`flex align-center pt-5 pb-5`}>
                          <div className={`flex align-center w-100-p`}>
                              {custom
                                ? (
                                    <textarea rows="1" disabled value={name}/>
                                )
                                : (
                                    <select value={name} className={`ml-10`} onChange={onFieldSelect}>
                                      {fields.map(({ name: fieldName }) => <option value={fieldName} label={fieldName} key={fieldName}/>)}
                                    </select>
                                )
                              }

                              <FaRegWindowClose onClick={() => _delete(name)} size={20} className={`mr-10 ml-10 min-w-20`}/>

                                <textarea rows="1" value={fieldValue} onChange={onFieldChange} />
                                  {withFile && (
                                    <Tooltip
                                      trigger={['hover']}
                                      overlay={<FileSelector onChange={onFileChange} />}
                                      placement={`top`}
                                    >
                                        <button className={`black ml-20`}> File?</button>
                                    </Tooltip>
                                  )}
                                  {withVariable && (
                                    <Tooltip
                                      trigger={['hover']}
                                      overlay={<VariableSelector onChange={onVariableChange} />}
                                      placement={`top`}
                                    >
                                        <button className={`black ml-20`}> Variable?</button>
                                    </Tooltip>
                                  )}
                          </div>
                      </div>
                    )
                })}

              {!_.isEmpty(fields) && (
                <div className={`w-100-p`}>
                  <select className={`ml-10 min-w-60`} onChange={onNewFieldSelect} value={``}>
                    {[{name: ' '}, ...fields.filter(({ name }) => value[name] === undefined)].map(({ name }) => <option value={name} label={name} key={name}/>)}
                  </select>
                </div>
              )}

              {enableCreating && (
                <div className={`flex align-center`}>
                  New field:
                  <textarea
                    rows="1"
                    value={newField}
                    onChange={({target: {value}}) => setNewField(value)}
                    className={`ml-15`}
                  />
                  <button className={`ml-20`} onClick={onAddFieldClick}>+ (Add)</button>
                </div>
              )}
            </div>
        </div>
    );
};

export default ObjectEditor