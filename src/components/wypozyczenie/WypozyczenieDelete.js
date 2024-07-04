import React from "react";
import { getWypozyczenieByIdApiCall, deleteWypozyczenieApiCall } from "../../apiCalls/wypozyczenieApiCalls";
import { Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

class WypozyczenieDelete extends React.Component{

    constructor(props){
        super(props)
        let { wypId } = this.props.match.params
        
        this.state = {
            error: null,
            isLoaded: false,
            wypId: wypId,
            wypozyczenie: null,
            message: null,
            redirect: false
        }
    }

    fetchWypozyczenieDetails = () => {
        getWypozyczenieByIdApiCall(this.state.wypId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            wypozyczenie: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            wypozyczenie: data,
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
        this.fetchWypozyczenieDetails();
    }

    handleDelete = () => {
        let 
            promise,
            response;
        promise = deleteWypozyczenieApiCall(this.state.wypId)

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
                    pathname: "/wypozyczenia"
                }} />
            )
        }

        if(error){
            content = <p>{t('form.error')}: {error.message}</p>
        }

        return(
            <main>
                <h2>{t('wyp.delete.confirm.text')}</h2>
                {content}
                
                <Link to="/wypozyczenia" className="button-add" onClick={() => this.handleDelete()}>{t('delete.yes')}</Link>
                <br></br>
                <br></br>
                <Link to="/wypozyczenia" className="button-add">{t('delete.no')}</Link>
                
            </main>
        )
    }

}

export default withTranslation() (WypozyczenieDelete)