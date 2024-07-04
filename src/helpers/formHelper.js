const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    notEmpty: 'notEmpty',
    len_2_20: 'len_2_20',
    len_2_60: 'len_2_60',
    len_2_80: 'len_2_80',
    len_2_120: 'len_2_120',
    num: 'num',
    date: 'date',
    dateAfter: 'dateAfter'
}

export function getValidationErrorKey(error){
    return `validation.messages.${error}`
}

export default formMode