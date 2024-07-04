import { t } from "i18next";
import React from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/authHelper'

function WypozyczenieListTableRow(props) {
    const wypozyczenie = props.wypozyczenieData
    return (
        <tr>
            <td>{wypozyczenie.ksiazka_id}</td>
            <td>{wypozyczenie.czytelnik_id}</td>
            <td>{wypozyczenie.dataWypozyczenia}</td>
            <td>{wypozyczenie.dataOddania}</td>
            {isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li><Link to={`wypozyczenia/details/${wypozyczenie._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`wypozyczenia/edit/${wypozyczenie._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><Link to={`wypozyczenia/delete/${wypozyczenie._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
            }
        </tr>
    )
}

export default WypozyczenieListTableRow