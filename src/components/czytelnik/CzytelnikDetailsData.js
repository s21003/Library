import React from "react";
import { getFormattedDate } from "../../helpers/dateHelper";
import { useTranslation } from "react-i18next";

function CzytelnikDetailsData(props) {
    const czytelnik = props.czytData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('czyt.fields.imie')}: {czytelnik.imie}</p>
            <p>{t('czyt.fields.nazwisko')}: {czytelnik.nazwisko}</p>
            <p>{t('czyt.fields.adres')}: {czytelnik.adres}</p>
            <h2>{t('czyt.details.wypozyczenia')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('czyt.details.title')}</th>
                        <th>{t('czyt.details.dateFrom')}</th>
                        <th>{t('czyt.details.dateTo')}</th>
                    </tr>
                </thead>
                <tbody>
                    {czytelnik.wypozyczenia.map(
                        wypozyczenie =>
                            <tr key={wypozyczenie._id}>
                                <td>{wypozyczenie.ksiazka.tytul}</td>
                                <td>{wypozyczenie.dataWypozyczenia ? getFormattedDate(wypozyczenie.dataWypozyczenia) : ""}</td>
                                <td>{wypozyczenie.dataOddania ? getFormattedDate(wypozyczenie.dataOddania) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default CzytelnikDetailsData