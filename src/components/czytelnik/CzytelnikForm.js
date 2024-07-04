import React from "react"
import { getCzytelnikByIdApiCall, addCzytelnikApiCall, updateCzytelnikApiCall } from "../../apiCalls/czytelnikApiCalls"
import formMode from "../../helpers/formHelper"
import { checkRequired, checkTextLengthRange } from '../../helpers/validationCommon'
import FormInput  from '../form/FormInput'
import FormButtons  from '../form/FormButtons'
import { formValidationKeys } from '../../helpers/formHelper'
import { withTranslation } from 'react-i18next'
import { Redirect } from "react-router-dom"

class CzytelnikForm extends React.Component {
    constructor(props) {
        super(props)

        const parmasCzytId = props.match.params.czytId;
        const currentFormMode = parmasCzytId ? formMode.EDIT : formMode.NEW;
        console.log("constrctor formMode: "+JSON.stringify(formMode))
        this.state = {
            czytId: parmasCzytId,
            czyt: {
                imie: '',
                nazwisko: '',
                adres: '',
                login: '',
                password: ''
            },
            errors: {
                imie: '',
                nazwisko: '',
                adres: '',
                login: '',
                password: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchCzytelnikDetails = () => {
        getCzytelnikByIdApiCall(this.state.czytId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            czyt: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    componentDidMount(){
        const currentFormMode = this.state.formMode
        if(currentFormMode === formMode.EDIT) {
            this.fetchCzytelnikDetails()
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const czyt = { ...this.state.czyt }
        czyt[name] = value
        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            czyt: czyt,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if(fieldName === 'imie') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }else if(!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if(fieldName === 'nazwisko') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }else if(!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if(fieldName === 'adres') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }else if(!checkTextLengthRange(fieldValue, 2, 80)) {
                errorMessage = formValidationKeys.len_2_80
            }
        }
        if(fieldName === 'login') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }else if(!checkTextLengthRange(fieldValue, 2, 20)) {
                errorMessage = formValidationKeys.len_2_20
            }
        }
        if(fieldName === 'password') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                czyt = this.state.czyt,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addCzytelnikApiCall(czyt)
    
            } else if (currentFormMode === formMode.EDIT) {
                console.log(czyt)
                const czytId = this.state.czytId
                promise = updateCzytelnikApiCall(czytId, czyt)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const czyt = this.state.czyt
        const errors = this.state.errors
        for (const fieldName in czyt) {
            const fieldValue = czyt[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }
    
    render() {
        const { t } = this.props;
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('czyt.form.add.confirm.text') : t('czyt.form.edit.confirm.text')
            return (
                <Redirect to={{
                    pathname: "/czytelnicy",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
    
        const errorsSummary = this.hasErrors() ? t('validation.messages.formErrors') : ''
        const fetchError = this.state.error ? `${t('form.error')}: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('czyt.form.add.pageTitle') : t('czyt.form.edit.pageTitle')
    
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
    
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('czyt.fields.imie')}
                        required
                        error={this.state.errors.imie}
                        name="imie"
                        placeholder="2-60 "
                        onChange={this.handleChange}
                        value={this.state.czyt.imie}
                    />
                    <FormInput
                        type="text"
                        label={t('czyt.fields.nazwisko')}
                        required
                        error={this.state.errors.nazwisko}
                        name="nazwisko"
                        placeholder='2-60 '
                        onChange={this.handleChange}
                        value={this.state.czyt.nazwisko}
                    />
                    <FormInput
                        type="text"
                        label={t('czyt.fields.adres')}
                        required
                        error={this.state.errors.adres}
                        name="adres"
                        placeholder="2-80 "
                        onChange={this.handleChange}
                        value={this.state.czyt.adres}
                    />
                    <FormInput
                        type="text"
                        label={t('czyt.fields.login')}
                        required
                        error={this.state.errors.login}
                        name="login"
                        placeholder="2-20 "
                        onChange={this.handleChange}
                        value={this.state.czyt.login}
                    />
                    <FormInput
                        type="password"
                        label={t('czyt.fields.password')}
                        required
                        error={this.state.errors.password}
                        name="password"
                        placeholder={t('czyt.fields.password')}
                        onChange={this.handleChange}
                        value={this.state.czyt.password}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/czytelnicy"
                    />
                </form>
            </main >
        )
    }
}

export default withTranslation()(CzytelnikForm)