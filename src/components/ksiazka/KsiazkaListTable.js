import { t } from "i18next";
import React from "react";
import KsiazkaListTableRow from './KsiazkaListTableRow'

function KsiazkaListTable(props) {
    const ksiazki = props.ksiList
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>{t('ksi.fields.tytul')}</th>
                    <th>{t('ksi.fields.rokWydania')}</th>
                    <th>{t('ksi.fields.kategoria')}</th>
                    <th>{t('ksi.fields.wydawnictwo')}</th>
                    <th>{t('ksi.fields.imieAutor')}</th>
                    <th>{t('ksi.fields.nazwiskoAutor')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {ksiazki.map(ksi =>
                    <KsiazkaListTableRow ksiData={ksi} key={ksi._id} />    
                )}
            </tbody>
        </table>
    )
}

export default KsiazkaListTable