import React from "react";
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation} from 'react-i18next'

function WypozyczenieDetailsData(props) {
    const { t } = useTranslation();
    const wypozyczenie = props.wypozyczenieData
    const wypozyczenieDateFrom = wypozyczenie.dataWypozyczenia ? getFormattedDate(wypozyczenie.dataWypozyczenia) : ""
    const wypozyczenieDateto = wypozyczenie.dataOddania ? getFormattedDate(wypozyczenie.dataOddania) : ""
    return(
        <React.Fragment>
            <p>{t('wyp.details.imie')}: {wypozyczenie.czytelnik.imie}</p>
            <p>{t('wyp.details.nazwisko')}: {wypozyczenie.czytelnik.nazwisko}</p>
            <p>{t('wyp.details.title')}: "{wypozyczenie.ksiazka.tytul}"</p>
            <p>{t('wyp.details.dateFrom')}: {wypozyczenieDateFrom} </p>
            {wypozyczenieDateto && <p>{t('wyp.details.dateTo')}: {wypozyczenieDateto}</p>}
        </React.Fragment>
    )
}

export default WypozyczenieDetailsData