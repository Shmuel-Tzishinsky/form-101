import { MdFormatListNumberedRtl } from 'react-icons/md';

export const initialState = {
  error: false,
  load: false,
  errorMessage: '',
  companys: [],
  load: false,
  uniqueCompany: {},
  forms: [],
  formsLength: 0
};

const companysReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOADING':
      return {
        ...state,
        load: true
      };
    case 'GET_ALL_COMAPNYS':
      console.log('GET_ALL_COMAPNYS', payload);

      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        companys: payload.companys
      };
    case 'EDIT_COMPANY':
      console.log('EDIT_COMPANY', payload);

      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        uniqueCompany: payload.uniqueCompany
      };
    case 'ADD_NEW_COMPANY':
      console.log('ADD_NEW_COMPANY', payload);

      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        companys: payload.companys
      };
    case 'GET_UNIQUE_COMPANY':
      console.log('GET_UNIQUE_COMPANY', payload);

      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        uniqueCompany: payload.uniqueCompany
      };
    case 'GET_ALL_FORMS_IN_COMPANYS':
      console.log('GET_ALL_FORMS_IN_COMPANYS', payload);

      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        forms: payload.forms
      };
    case 'GET_ALL_FORMS':
      console.log('GET_ALL_FORMS', payload);

      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        formsLength: payload.formsLength
      };
    case 'DELETE_COMPANY':
      console.log('DELETE_COMPANY', payload);

      return {
        ...state,
        error: false,
        load: false,
        errorMessage: ''
      };
    case 'ERROR':
      console.log('ERROR', payload);

      return {
        ...state,
        error: payload.error,
        errorMessage: payload.errorMessage,
        load: false
      };
    default:
      throw new Error(`No case for type ${type} found in companysReducer.`);
  }
};

export default companysReducer;
