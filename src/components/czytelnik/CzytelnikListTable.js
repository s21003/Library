import React from "react";
import CzytelnikListTableRow from './CzytelnikListTableRow'
import { t } from "i18next";

function CzytelnikListTable(props) {
    const czytelniks = props.czytList
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>{t('czyt.fields.imie')}</th>
                    <th>{t('czyt.fields.nazwisko')}</th>
                    <th>{t('czyt.fields.adres')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {czytelniks.map(czyt =>
                    <CzytelnikListTableRow czytData={czyt} key={czyt._id} />    
                )}
            </tbody>
        </table>
    )
}

export default CzytelnikListTable