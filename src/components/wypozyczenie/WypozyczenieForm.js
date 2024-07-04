import React from 'react'
import { addWypozyczenieApiCall, getWypozyczenieByIdApiCall, updateWypozyczenieApiCall } from '../../apiCalls/wypozyczenieApiCalls'
import { getCzytelniksApiCall } from '../../apiCalls/czytelnikApiCalls'
import { getKsiazkiApiCall} from '../../apiCalls/ksiazkaApiCalls'
import { checkRequired, checkDate } from '../../helpers/validationCommon'
import formMode from '../../helpers/formHelper'
import FormInput  from '../form/FormInput'
import FormButtons  from '../form/FormButtons'
import { withTranslation } from 'react-i18next'
import { formValidationKeys } from '../../helpers/formHelper'
import { Redirect } from 'react-router-dom'
import SelectCzytelnik from './SelectCzytelnik'
import SelectKsiazka from './SelectKsiazka'
import { getFormattedDate } from '../../helpers/dateHelper'

class WypozyczenieForm extends React.Component {
    constructor(props) {
        super(props)
        const paramsWypId = props.match.params.wypId
        const currentFormMode = paramsWypId ? formMode.EDIT : formMode.NEW
        this.state = {
            wypId: paramsWypId,
            wyp: {
                ksiazka_id: '',
                czytelnik_id: '',
                dataWypozyczenia: '',
                dataOddania: null
            },
            errors: {
                ksiazka_id: '',
                czytelnik_id: '',
                dataWypozyczenia: '',
                dataOddania: ''
            },
            czytelnicy: [],
            ksiazki: [],
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchWypozyczenieDetails = () => {
        getWypozyczenieByIdApiCall(this.state.wypId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (DataTransfer.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            wyp: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    fetchCzytelnikData = () => {
        getCzytelniksApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        czytelnicy: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    fetchKsiazkaData = () => {
        getKsiazkiApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        ksiazki: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    componentDidMount = () => {
        this.fetchCzytelnikData();
        this.fetchKsiazkaData();
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchWypozyczenieDetails()
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const wyp = { ...this.state.wyp }
        wyp[name] = value
        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            wyp: wyp,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = ''

        if (fieldName === 'ksiazka_id'){
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'czytelnik_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }
        if (fieldName === 'dataWypozyczenia') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.date
            }
        }
        if (fieldName === 'dataOddania') {
            if(fieldValue === "") {
                fieldValue = null;
                this.state.wyp.dataOddania=null
            }
            if (!checkDate(fieldValue) && !(fieldValue === null)) {
                errorMessage = formValidationKeys.date
            }
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                wyp = this.state.wyp,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addWypozyczenieApiCall(wyp)
            } else if (currentFormMode === formMode.EDIT) {
                console.log(wyp)
                const wypId = this.state.wypId
                promise = updateWypozyczenieApiCall(wypId, wyp)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500){
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data){
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
        const wyp  = this.state.wyp
        const errors = this.state.errors
        for (const fieldName in wyp) {
            const fieldValue = wyp[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('wyp.form.add.confirm.text') : t('wyp.form.edit.confirm.text')
            return (
                <Redirect to={{
                    pathname: "/wypozyczenia",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? t('validation.messages.formErrors') : ''
        const fetchError = this.state.error ? `${t('form.error')}: ${this.state.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('wyp.form.add.pageTitle') : t('wyp.form.edit.pageTitle')
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        const czytelnicy = this.state.czytelnicy
        const ksiazki = this.state.ksiazki
        return(
            <main>
                <h2>{pageTitle}</h2>
                <form className='form' onSubmit={this.handleSubmit}>
                    <SelectCzytelnik
                        selectText={t('wyp.fields.selectTextCzyt')}
                        selectedData={czytelnicy}
                        type="text"
                        label={t('wyp.fields.czytelnik_id')}
                        required
                        error={this.state.errors.czytelnik_id}
                        name="czytelnik_id"
                        placeholde="12"
                        onChange={this.handleChange}
                        value={this.state.wyp.czytelnik_id}
                    />
                    <SelectKsiazka
                        selectText={t('wyp.fields.selectTextKsi')}
                        selectedData={ksiazki}
                        type="text"
                        label={t('wyp.fields.ksiazka_id')}
                        required
                        error={this.state.errors.ksiazka_id}
                        name="ksiazka_id"
                        placeholde="12"
                        onChange={this.handleChange}
                        value={this.state.wyp.ksiazka_id}
                    />
                    <FormInput
                        type="date"
                        label={t('wyp.fields.dataWypozyczenia')}
                        required
                        error={this.state.errors.dataWypozyczenia}
                        name="dataWypozyczenia"
                        placeholder="12"
                        onChange={this.handleChange}
                        value={this.state.wyp.dataWypozyczenia ? getFormattedDate(this.state.wyp.dataWypozyczenia) : null}
                    />
                    <FormInput
                        type="date"
                        label={t('wyp.fields.dataOddania')}
                        error={this.state.errors.dataOddania}
                        name="dataOddania"
                        placeholder="12"
                        onChange={this.handleChange}
                        value={this.state.wyp.dataOddania ? getFormattedDate(this.state.wyp.dataOddania) : null}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/wypozyczenia"
                    />
                </form>
            </main>
        )
    }
}

export default withTranslation() (WypozyczenieForm)