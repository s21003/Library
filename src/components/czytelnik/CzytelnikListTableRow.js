import React from "react";
import { Link } from 'react-router-dom';
import { t } from "i18next";
import { isAuthenticated } from '../../helpers/authHelper'

function CzytelnikListTableRow(props) {
    const czyt = props.czytData
    return (
        <tr>
            <td>{czyt.imie}</td>
            <td>{czyt.nazwisko}</td>
            <td>{czyt.adres}</td>
            {isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li><Link to={`czytelnicy/details/${czyt._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`czytelnicy/edit/${czyt._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><Link to={`czytelnicy/delete/${czyt._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
            }
        </tr>
    )
}

export default CzytelnikListTableRow