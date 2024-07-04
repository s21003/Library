import React from "react";
import { getCzytelnikByIdApiCall, deleteCzytelnikApiCall } from "../../apiCalls/czytelnikApiCalls";
import { Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

class CzytelnikDelete extends React.Component{

    constructor(props){
        super(props)
        let { czytId } = this.props.match.params
        
        this.state = {
            error: null,
            isLoaded: false,
            czytId: czytId,
            czytelnik: null,
            message: null,
            redirect: false
        }
    }

    fetchCzytelnikDetails = () => {
        getCzytelnikByIdApiCall(this.state.czytId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            czytelnik: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            czytelnik: data,
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
                }
            )
    }

    componentDidMount(){
        this.fetchCzytelnikDetails();
    }

    handleDelete = () => {
        let 
            promise,
            response;
        promise = deleteCzytelnikApiCall(this.state.czytId)

        if (promise) {
            promise
            .then(
                (data) => {
                    response = data
                        if (response.status === 201 || response.status === 500) {
                            return data.json()
                        }
                })
            this.setState({ redirect: true })
        }
    }

    render(){
        const { error } = this.state;
        let content;
        const { redirect } = this.state
        const { t } = this.props;

        if (redirect) {
                return (
                <Redirect to={{
                    pathname: "/czytelnicy"
                }} />
            )
        }

        if(error){
            content = <p>{t('error.error')}: {error.message}</p>
        }
        return(
            <main>
                <h2>{t('czyt.delete.confirm.text')}</h2>
                {content}
                <button className="button-add" onClick={() => this.handleDelete()}>{t('delete.yes')}</button>
                <br></br>
                <br></br>
                <Link to="/czytelnicy" className="button-add">{t('delete.no')}</Link>
                
            </main>
        )
    }

}

export default withTranslation() (CzytelnikDelete)