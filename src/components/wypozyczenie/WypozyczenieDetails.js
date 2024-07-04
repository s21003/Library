import { t } from "i18next"
import React from "react"
import { withTranslation } from "react-i18next"
import { Link } from 'react-router-dom'
import { getWypozyczenieByIdApiCall } from '../../apiCalls/wypozyczenieApiCalls'
import WypozyczenieDetailsData from './WypozyczenieDetailsData'

class WypozyczenieDetails extends React.Component {
    constructor(props) {
        super(props)
        let { wypId } = this.props.match.params
        this.state = {
            wypId: wypId,
            wypozyczenie: null,
            error: null,
            isLoaded: false,
            message: null
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
                            message: null,
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
        this.fetchWypozyczenieDetails()
    }

    render() {
        const { wypozyczenie, error, isLoaded, message } = this.state
        let content;

        if(error){
            content = <p>{t('form.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('wyp.details.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <WypozyczenieDetailsData wypozyczenieData={wypozyczenie} />
        }

        return(
            <main>
                <h2>{t('wyp.details.pageTitle')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/wypozyczenia" className="button-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}

export default withTranslation()(WypozyczenieDetails)