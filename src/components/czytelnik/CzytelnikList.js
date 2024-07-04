import React from 'react'
import { withTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { getCzytelniksApiCall } from '../../apiCalls/czytelnikApiCalls';
import CzytelnikListTable from "./CzytelnikListTable";
import { t } from "i18next";

class CzytelnikList extends React.Component {
    constructor(props) {
        super(props) 
        let notice = props.location.state && props.location.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            czytelniks: [],
            notice:notice
        }
    }

    fetchCzytelnikList = () => {
        getCzytelniksApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        czytelniks: data
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
        this.fetchCzytelnikList()
    }
    
    render() {
        const { error, isLoaded, czytelniks } = this.state
        let content;

        if(error) {
            content = <p>{t('form.error')} : {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('czyt.list.loading')}</p>
        } else {
            content = <CzytelnikListTable czytList = {czytelniks} />
        }

        return (
            <main>
                <h2>{t('czyt.list.pageTitle')}</h2>
                { content}
                    <p className="section-buttons">
                        <Link to="/czytelnicy/add" className="button-add">{t('czyt.list.addNew')}</Link>
                    </p>
                <p className="success">{this.state.notice}</p>
            </main>
        )
    }

}

export default withTranslation()(CzytelnikList)