import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { getKsiazkaByIdApiCall } from '../../apiCalls/ksiazkaApiCalls';
import KsiazkaDetailsData from "./KsiazkaDetailsData";

class KsiazkaDetails extends React.Component {
    constructor(props){
        super(props)
        let { ksiId } = this.props.match.params
        this.state = {
            ksiId: ksiId,
            ksiazka: null,
            error: null,
            isLoaded: null,
            message: null
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
                            ksiazka:data,
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
        this.fetchKsiazkaDetails()
    }

    render(){
        const { ksiazka, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;

        if (error) {
            content = <p>`{t('form.error')}`: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('ksi.details.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <KsiazkaDetailsData ksiData={ksiazka} />
        }
        return(
            <main>
                <h2>{t('ksi.details.pageTitle')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/ksiazki" className="button-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}

export default withTranslation()(KsiazkaDetails)