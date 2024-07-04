import { t } from "i18next";
import React from "react";
import WypozyczenieListTableRow from './WypozyczenieListTableRow'

function WypozyczenieListTable(props) {
    const wypozyczenia = props.wypozyczeniaList
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('wyp.fields.ksiazka_id')}</th>
                    <th>{t('wyp.fields.czytelnik_id')}</th>
                    <th>{t('wyp.fields.dataWypozyczenia')}</th>
                    <th>{t('wyp.fields.dataOddania')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {wypozyczenia.map(wypozyczenie =>
                    <WypozyczenieListTableRow wypozyczenieData={wypozyczenie} key={wypozyczenie._id} />
                    )}
            </tbody>
        </table>
    )
}

export default WypozyczenieListTable