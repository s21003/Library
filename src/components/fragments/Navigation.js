import React from "react";
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper'

class Navigation extends React.Component {
    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if(err) return console.log('something wnet wrong loading', err);
        });
    }
    render(){
        const { t } = this.props
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>{t('auth.logout')}</button> : <Link to="/login">{t('form.actions.login')}</Link>
    return (
        <nav>
            <ul>
                <li className='lang'>{loginLogoutLink}</li>
                <li><button onClick={() => { this.handleLanguageChange('pl')}}>PL</button></li>
                <li><button onClick={() => { this.handleLanguageChange('en')}}>EN</button></li>
            </ul>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/czytelnicy">{t('nav.czytelniks')}</Link></li>
                <li><Link to="/wypozyczenia">{t('nav.wypozyczenia')}</Link></li>
                <li><Link to="/ksiazki">{t('nav.ksiazki')}</Link></li>
            </ul>
        </nav>
    )}
}

export default withTranslation()(Navigation)