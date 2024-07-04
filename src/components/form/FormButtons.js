import { t } from "i18next";
import React from "react";
import { Link } from 'react-router-dom';
import formMode from "../../helpers/formHelper";

function FormButtons(props){
    const submitButtonLabel = props.formMode === formMode.NEW ? t('form.actions.add') : t('form.actions.edit')

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('form.actions.cancel')}</Link>
        </div>
    )
}

export default FormButtons