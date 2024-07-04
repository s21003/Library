import React from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import FormInput from '../form/FormInput'
import { loginApiCall } from "../../apiCalls/authApiCalls";
import { checkRequired, checkTextLengthRange } from "../../helpers/validationCommon";
import { formValidationKeys } from "../../helpers/formHelper";
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: {
                login: '',
                password: ''
            },
            errors: {
                login: '',
                password: ''
            },
            error: '',
            message: '',
            prevPath: ''
        }
    }

    handleChange = (event) =>{
        const { name, value } = event.target
        const user = { ...this.state.user }
        user[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.errors }
        errors[name] = errorMessage

        this.setState({
            user: user,
            errors: errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const isValid = this.validateForm()
        if(isValid){
            const user = this.state.user

            let response
            loginApiCall(user)
                .then(res => {
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        if(response.status === 200) {
                            if(data.token) {
                                const userString = JSON.stringify(data)
                                this.props.handleLogin(userString)
                                this.props.history.goBack()
                            }
                        } else if (response.status ===401) {
                            console.log(401)
                            this.setState({message: data.message})
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    })
        }
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = ''
        if (fieldName === 'login'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkTextLengthRange(fieldValue,2,20)){
                errorMessage = formValidationKeys.len_2_20
            }
        }
        if(fieldName === 'password') {
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const user = this.state.user
        const errors = this.state.errors
        for(const fieldName in user){
            const fieldValue = user[fieldName]
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
        for(const errorField in this.state.errors){
            if(errors[errorField].length > 0){
                return true
            }
        }
        return false
    }

    render(){
        const { t } = this.props
        const errorsSummary = this.hasErrors() ? t('validation.messages.formErrors') : ''
        const fetchError = this.state.error ? `${t('error')}: ${this.state.error.message}` : ''
        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <div id="login">
                    <h2>{t('auth.pageTitle')}</h2>
                    <form className="form" method="post" onSubmit={this.handleSubmit}>
                        <FormInput
                            name="login"
                            value={this.state.user.login}
                            error={this.state.errors.login}
                            label={t('czyt.fields.login')}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="2-20"
                        />
                        <FormInput
                            name="password"
                            value={this.state.user.password}
                            error={this.state.errors.password}
                            label={t('czyt.fields.password')}
                            onChange={this.handleChange}
                            type="password"
                            placeholder={t('czyt.fields.password')}
                        />
                        <div className="form-buttons">
                            <p id="errorsSummary" className="errors-text">{globalErrorMessage}</p>
                            <input className="form-button-submit" type="submit" value={t('login.submit')} />
                            <Link to="/" className="form-button-cancel">{t('form.actions.cancel')}</Link>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

export default withRouter(withTranslation()(LoginForm))