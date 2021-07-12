import React from 'react'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import FileSelector from './FileSelector'
import {FaRegWindowClose} from 'react-icons/fa'

// { name: '', fileSelectable: false, fileValueCreator }
const ObjectEditor = ({
    fields = [],
    allowCreateNewFields = false,
    value = {},
    onChange,
    title = ""
}) => {
    const onNewFieldSelect = ({ target: {value: fieldValue}}) => onChange({
      ...value,
      [fieldValue]: value[fieldValue] || ''
    })

  return (
        <div className={`flex align-center flex-wrap`}>
            <div className={`w-100-p`}>_______________________________________</div>
            <div className={`w-100 bold mb-5 mr-15 fz-20`}>{title}</div>
            <div className={`flex flex-column align-flex-start`}>
                {fields.filter(({ name }) => value[name] !== undefined).map(({
                     name = '',
                     fileSelectable = false,
                     fileValueCreator,
                     textable = false
                 }) => {
                    const fieldValue = value[name] || ''
                    const onFileChange = fileName => onChange({
                        ...value,
                        [name]: fileValueCreator(fileName)
                    })

                    const onFieldChange = ({ target: {value: fieldValue} }) =>
                      onChange({...value, [name]: fieldValue})

                    const _delete = () => {
                        const clone = {...value}
                        delete clone[name]
                        onChange(clone)
                    }

                    const onFieldSelect = ({ target: { value: fieldName }}) => {
                        debugger
                        const clone = {...value}
                        clone[fieldName] = clone[name]
                        delete clone[name]
                        onChange(clone)
                    }

                    return (
                      <div key={name} className={`flex align-center pt-5 pb-5`}>
                          <div className={`flex align-center w-100-p`}>
                              <select value={name} className={`ml-10`} onChange={onFieldSelect}>
                                  {fields.map(({ name: fieldName }) => <option value={fieldName} label={fieldName}/>)}
                              </select>
                              <FaRegWindowClose onClick={() => _delete(name)} size={20} className={`mr-10 ml-10 min-w-20`}/>

                                <textarea rows="1" value={fieldValue} onChange={onFieldChange} />
                                  {fileSelectable && (
                                    <Tooltip
                                      trigger={['hover']}
                                      overlay={<FileSelector onChange={onFileChange} />}
                                      placement={`top`}
                                    >
                                        <button className={`black ml-20`}> File?</button>
                                    </Tooltip>
                                  )}
                          </div>
                      </div>
                    )
                })}

                <div className={`w-100-p`}>
                    <select className={`ml-10 min-w-60`} onChange={onNewFieldSelect} value={``}>
                        {[{name: ' '}, ...fields.filter(({ name }) => value[name] === undefined)].map(({ name }) => <option value={name} label={name}/>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ObjectEditor