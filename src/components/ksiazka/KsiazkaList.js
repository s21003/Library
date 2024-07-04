import React from "react";
import { Link } from 'react-router-dom';
import { getKsiazkiApiCall } from '../../apiCalls/ksiazkaApiCalls';
import KsiazkaListTable from "./KsiazkaListTable";
import { withTranslation } from 'react-i18next';
import { isAuthenticated } from "../../helpers/authHelper";

class ksiazkaList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            ksiazki: [],
            notice:notice
        }
    }

    fetchKsiazkaList = () => {
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
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchKsiazkaList()
    }

    render() {
        const { error, isLoaded, ksiazki } = this.state
        let content;
        const { t } = this.props;

        if(error) {
            content = <p>{t('form.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('ksi.list.loading')}</p>
        } else {
            content = <KsiazkaListTable ksiList = {ksiazki} />
        }

        return (
            <main>
                <h2>{t('ksi.list.pageTitle')}</h2>
                { content}
                {isAuthenticated() &&
                    <p className="section-buttons">
                        <Link to="/ksiazki/add" className="button-add">{t('ksi.list.addNew')}</Link>
                    </p>
                }
                <p className="success">{this.state.notice}</p>
            </main>
        )
    }

}

export default withTranslation()(ksiazkaList)