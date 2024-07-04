import React from "react";
import { Link } from 'react-router-dom';
import { t } from "i18next";
import { isAuthenticated } from '../../helpers/authHelper'

function KsiazkaListTableRow(props) {
    const ksi = props.ksiData
    return (
        <tr>
            <td>{ksi.tytul}</td>
            <td>{ksi.rokWydania}</td>
            <td>{ksi.kategoria}</td>
            <td>{ksi.wydawnictwo}</td>
            <td>{ksi.imieAutor}</td>
            <td>{ksi.nazwiskoAutor}</td>
            {isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li><Link to={`ksiazki/details/${ksi._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`ksiazki/edit/${ksi._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><Link to={`ksiazki/delete/${ksi._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
            }
        </tr>
    )
}

export default KsiazkaListTableRow