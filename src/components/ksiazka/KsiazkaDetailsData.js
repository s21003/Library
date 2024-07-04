import React from "react";
import { getFormattedDate } from "../../helpers/dateHelper";
import { useTranslation } from 'react-i18next';

function KsiazkaDetailsData(props) {
    const ksiazka = props.ksiData
    const { t } = useTranslation();
    console.log("jestem w ksiazka details data")

    return (
        <React.Fragment>
            <p>{t('ksi.fields.tytul')}: "{ksiazka.tytul}"</p>
            <p>{t('ksi.fields.rokWydania')}: {ksiazka.rokWydania}</p>
            <p>{t('ksi.fields.kategoria')}: {ksiazka.kategoria}</p>
            <p>{t('ksi.fields.wydawnictwo')}: {ksiazka.wydawnictwo}</p>
            <p>{t('ksi.fields.imieAutor')}: {ksiazka.imieAutor}</p>
            <p>{t('ksi.fields.nazwiskoAutor')}: {ksiazka.nazwiskoAutor}</p>
            <h2>{t('ksi.details.wypozyczenia')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('ksi.details.imie')}</th>
                        <th>{t('ksi.details.nazwisko')}</th>
                        <th>{t('ksi.details.dateFrom')}</th>
                        <th>{t('ksi.details.dateTo')}</th>
                    </tr>
                </thead>
                <tbody>
                    {ksiazka.wypozyczenia.map(
                        wypozyczenie =>
                            <tr key={wypozyczenie._id}>
                                <td>{wypozyczenie.czytelnik.imie}</td>
                                <td>{wypozyczenie.czytelnik.nazwisko}</td>
                                <td>{wypozyczenie.dataWypozyczenia ? getFormattedDate(wypozyczenie.dataWypozyczenia) : ""}</td>
                                <td>{wypozyczenie.dataOddania ? getFormattedDate(wypozyczenie.dataOddania) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default KsiazkaDetailsData