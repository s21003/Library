import React from "react";
import { getKsiazkaByIdApiCall, deleteKsiazkaApiCall } from "../../apiCalls/ksiazkaApiCalls";
import { Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

class KsiazkaDelete extends React.Component{

    constructor(props){
        super(props)
        let { ksiId } = this.props.match.params
        
        this.state = {
            error: null,
            isLoaded: false,
            ksiId: ksiId,
            ksiazka: null,
            message: null,
            redirect: false
        }
    }

    fetchKsiazkaDetails = () => {
        getKsiazkaByIdApiCall(this.state.ksiId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            ksiazka: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            ksiazka: data,
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
        this.fetchKsiazkaDetails();
    }

    handleDelete = () => {
        let 
            promise,
            response;
        promise = deleteKsiazkaApiCall(this.state.ksiId)

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
                    pathname: "/ksiazki"
                }} />
            )
        }

        if(error){
            content = <p>{t('form.error')}: {error.message}</p>
        }
        return(
            <main>
                <h2>{t('ksi.delete.confirm.text')}</h2>
                {content}
                
                <button className="button-add" onClick={() => this.handleDelete()}>{t('delete.yes')}</button>
                <br></br>
                <br></br>
                <Link to="/ksiazki" className="button-add">{t('delete.no')}</Link>
                
            </main>
        )
    }

}

export default withTranslation() (KsiazkaDelete)