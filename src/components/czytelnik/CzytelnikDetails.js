import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { getCzytelnikByIdApiCall } from '../../apiCalls/czytelnikApiCalls';
import CzytelnikDetailsData from "./CzytelnikDetailsData";

class CzytelnikDetails extends React.Component {
    constructor(props){
        super(props)
        let { czytId } = this.props.match.params
        this.state = {
            czytId: czytId,
            czytelnik: null,
            error: null,
            isLoaded: null,
            message: null
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
                            czytelnik:data,
                            message:null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded:true,
                        error
                    })
                })
    }

    componentDidMount() {
        this.fetchCzytelnikDetails()
    }

    render(){
        const { czytelnik, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;

        if (error) {
            content = <p>`{t('form.error')}: {error.message}`</p>
        } else if (!isLoaded) {
            content = <p>{t('czyt.details.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <CzytelnikDetailsData czytData={czytelnik} />
        }
        return(
            <main>
                <h2>{t('czyt.details.pageTitle')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/czytelnicy" className="button-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}

export default withTranslation()(CzytelnikDetails)