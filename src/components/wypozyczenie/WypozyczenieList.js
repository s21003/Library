import { t } from "i18next"
import React from "react"
import { withTranslation } from "react-i18next"
import { Link } from 'react-router-dom'
import { getWypozyczeniaApiCall } from '../../apiCalls/wypozyczenieApiCalls'
import { isAuthenticated } from "../../helpers/authHelper"
import WypozyczenieListTable from './WypozyczenieListTable.js'

class WypozyczenieList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            wypozyczenia: [],
            notice:notice
        }
    }

    fetchWypozyczenieList = () => {
        getWypozyczeniaApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        wypozyczenia: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    componentDidMount() {
        this.fetchWypozyczenieList()
    }

    render() {
        const { error, isLoaded, wypozyczenia } = this.state
        let content;

        if(error) {
            content = <p>{t('form.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('wyp.list.loading')}</p>
        } else {
            content = <WypozyczenieListTable wypozyczeniaList={wypozyczenia} />
        }
        
        return(
            <main>
                <h2>{t('wyp.list.pageTitle')}</h2>
                {content}
                {isAuthenticated() &&
                    <p className="section-buttons">
                        <Link to="/wypozyczenia/add" className="button-add">{t('wyp.list.addNew')}</Link>
                    </p>
                }
            </main>
        )

    }
}

export default withTranslation()(WypozyczenieList)