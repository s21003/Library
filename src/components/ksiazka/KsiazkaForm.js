import React from "react"
import { getKsiazkaByIdApiCall, addKsiazkaApiCall, updateKsiazkaApiCall } from "../../apiCalls/ksiazkaApiCalls"
import formMode from "../../helpers/formHelper"
import { formValidationKeys } from "../../helpers/formHelper"
import { checkNumber, checkRequired, checkTextLengthRange } from '../../helpers/validationCommon'
import FormInput  from '../form/FormInput'
import FormButtons  from '../form/FormButtons'
import { Redirect } from "react-router-dom"
import { withTranslation } from 'react-i18next'

class KsiazkaForm extends React.Component {
    constructor(props) {
        super(props)

        const parmasKsiId = props.match.params.ksiId;
        const currentFormMode = parmasKsiId ? formMode.EDIT : formMode.NEW;

        this.state = {
            ksiId: parmasKsiId,
            ksi: {
                tytul: '',
                rokWydania: '',
                kategoria: '',
                wydawnictwo: '',
                imieAutor: '',
                nazwiskoAutor: '',
            },
            errors: {
                tytul: '',
                rokWydania: '',
                kategoria: '',
                wydawnictwo: '',
                imieAutor: '',
                nazwiskoAutor: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchKsiazkaDetails = () => {
        getKsiazkaByIdApiCall(this.state.ksiId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            ksi: data,
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
            this.fetchKsiazkaDetails()
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const ksi = { ...this.state.ksi }
        ksi[name] = value
        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            ksi: ksi,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if(fieldName === 'tytul') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }else if(!checkTextLengthRange(fieldValue, 2, 120)) {
                errorMessage = formValidationKeys.len_2_120
            }
        }
        if(fieldName === 'rokWydania') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkNumber(fieldValue)){
                errorMessage = formValidationKeys.num
            }
        }
        if(fieldName === 'kategoria') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }else if(!checkTextLengthRange(fieldValue, 2, 80)) {
                errorMessage = formValidationKeys.len_2_80
            }
        }
        if(fieldName === 'wydawnictwo') {
            if(!checkTextLengthRange(fieldValue, 2, 80) && !(fieldValue === '')) {
                errorMessage = formValidationKeys.len_2_80
            }
        }
        if(fieldName === 'imieAutor') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }else if(!checkTextLengthRange(fieldValue, 2, 80)) {
                errorMessage = formValidationKeys.len_2_80
            }
        }
        if(fieldName === 'nazwiskoAutor') {
            if(!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }else if(!checkTextLengthRange(fieldValue, 2, 80)) {
                errorMessage = formValidationKeys.len_2_80
            }
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                ksi = this.state.ksi,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addKsiazkaApiCall(ksi)
    
            } else if (currentFormMode === formMode.EDIT) {
                console.log(ksi)
                const ksiId = this.state.ksiId
                promise = updateKsiazkaApiCall(ksiId, ksi)
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
        const ksi = this.state.ksi
        const errors = this.state.errors
        for (const fieldName in ksi) {
            const fieldValue = ksi[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('ksi.form.add.confirm.text') : t('ksi.form.edit.confirm.text')
            return (
                <Redirect to={{
                    pathname: "/ksiazki",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? t('validation.messages.formErrors') : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('ksi.form.add.pageTitle') : t('ksi.form.edit.pageTitle')
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('ksi.fields.tytul')}
                        required
                        error={this.state.errors.tytul}
                        name="tytul"
                        placeholder="2-120"
                        onChange={this.handleChange}
                        value={this.state.ksi.tytul}
                    />
                    <FormInput
                        type="text"
                        label={t('ksi.fields.rokWydania')}
                        required
                        error={this.state.errors.rokWydania}
                        name="rokWydania"
                        placeholder={t('ksi.form.year')}
                        onChange={this.handleChange}
                        value={this.state.ksi.rokWydania}
                    />
                    <FormInput
                        type="text"
                        label={t('ksi.fields.kategoria')}
                        required
                        error={this.state.errors.kategoria}
                        name="kategoria"
                        placeholder={"2-80 "+t('form.chars')}
                        onChange={this.handleChange}
                        value={this.state.ksi.kategoria}
                    />
                    <FormInput
                        type="text"
                        label={t('ksi.fields.wydawnictwo')}
                        error={this.state.errors.wydawnictwo}
                        name="wydawnictwo"
                        placeholder={"2-80 " + t('form.chars')}
                        onChange={this.handleChange}
                        value={this.state.ksi.wydawnictwo}
                    />
                    <FormInput
                        type="text"
                        label={t('ksi.fields.imieAutor')}
                        required
                        error={this.state.errors.imieAutor}
                        name="imieAutor"
                        placeholder={"2-80 "+t('form.chars')}
                        onChange={this.handleChange}
                        value={this.state.ksi.imieAutor}
                    />
                    <FormInput
                        type="text"
                        label={t('ksi.fields.nazwiskoAutor')}
                        required
                        error={this.state.errors.nazwiskoAutor}
                        name="nazwiskoAutor"
                        placeholder={"2-80 "+t('form.chars')}
                        onChange={this.handleChange}
                        value={this.state.ksi.nazwiskoAutor}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/ksiazki"
                    />
                </form>
            </main >
        )
    }

}

export default withTranslation()(KsiazkaForm)