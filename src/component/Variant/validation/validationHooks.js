import { useState } from 'react';

import {
  firstnameValidator,
  emailValidator,
  lastnameValidator,
  mobilenoValidator,
  mailingaddressValidator,
} from '../validation/validation';

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };

    return acc;
  }, {});
};

export const useLoginForm = (form) => {
  const [errors, setErrors] = useState({
    firstname: {
      dirty: false,
      error: false,
      message: '',
    },

    lastname: {
      dirty: false,
      error: false,
      message: '',
    },

    email: {
      dirty: false,
      error: false,
      message: '',
    },

    mobileno: {
      dirty: false,
      error: false,
      message: '',
    },

    mailingaddress: {
      dirty: false,
      error: false,
      message: '',
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    let nextErrors = JSON.parse(JSON.stringify(errors));

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { firstname, lastname, email, mobileno, mailingaddress } = form;

    if (nextErrors.firstname.dirty && (field ? field === 'firstname' : true)) {
      const firstnameField = firstnameValidator(firstname, form);
      nextErrors.firstname.error = !!firstnameField;

      nextErrors.firstname.message = firstnameField;

      if (!!firstnameField) isValid = false;
    }

    if (nextErrors.lastname.dirty && (field ? field === 'lastname' : true)) {
      const lastnameField = lastnameValidator(lastname, form);
      nextErrors.lastname.error = !!lastnameField;

      nextErrors.lastname.message = lastnameField;

      if (!!lastnameField) isValid = false;
    }

    if (nextErrors.email.dirty && (field ? field === 'email' : true)) {
      const emailField = emailValidator(email, form);
      nextErrors.email.error = !!emailField;

      nextErrors.email.message = emailField;

      if (!!emailField) isValid = false;
    }

    if (nextErrors.mobileno.dirty && (field ? field === 'mobileno' : true)) {
      const mobilenoField = mobilenoValidator(mobileno, form);
      nextErrors.mobileno.error = !!mobilenoField;

      nextErrors.mobileno.message = mobilenoField;

      if (!!mobilenoField) isValid = false;
    }

    if (
      nextErrors.mailingaddress.dirty &&
      (field ? field === 'mailingaddress' : true)
    ) {
      const mailingaddressField = mailingaddressValidator(mailingaddress, form);
      nextErrors.mailingaddress.error = !!mailingaddressField;

      nextErrors.mailingaddress.message = mailingaddressField;

      if (!!mailingaddressField) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
