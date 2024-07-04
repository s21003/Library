import React from 'react'
import { getValidationErrorKey } from '../../helpers/formHelper'
import { useTranslation } from 'react-i18next'
function SelectCzytelnik(props) {
    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const options = props.selectedData
    const error = props.error
    const errorKey = getValidationErrorKey(error)
    const { t } = useTranslation();
    const translatedErrorMessage = t(errorKey)
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title='required' aria-label="required">*</abbr>}
            </label>
            <select
                type={props.type}
                className={className}
                name={props.name}
                id={props.name}
                onChange={props.onChange} 
                value={props.value}
            >
                <option value="">{props.selectText}</option>
                {options.map((option) => (
                    <option value={option._id}>{option.imie + ' ' + option.nazwisko}</option>
                ))}
            </select>
            <span id={errorSpanId} className='error-text'>{translatedErrorMessage}</span>
        </>
    )
}

export default SelectCzytelnik