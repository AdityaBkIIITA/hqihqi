import React from "react";
import {
  CheckboxProps,
  PasswordInputProps,
  TextInputProps
} from "@razorpay/blade/components";

export function throttle(cb: (...args: any) => void, delay = 1000) {
  let shouldWait = false;
  let waitingArgs: any;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: any) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}

export const useFormValidation = () => {
  const [passwordValidationState, setPasswordValidationState] = React.useState<
    PasswordInputProps["validationState"]
  >("none");

  const [checkboxValidationState, setCheckboxValidationState] = React.useState<
    CheckboxProps["validationState"]
  >("none");

  const [emailValidationState, setEmailValidationState] = React.useState<
    TextInputProps["validationState"]
  >("none");

  const [isLoading, setIsLoading] = React.useState(false);

  const onPasswordChange = throttle((e) => {
    if (e.value.length <= 8) {
      setPasswordValidationState("error");
    } else {
      setPasswordValidationState("none");
    }
  }, 1000);

  const onEmailChange = throttle((e) => {
    // Do use better regex depending on the usecase. This one covers only basic email validations
    // eslint-disable-next-line
    const EMAIL_VALIDATION_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const email = e.value;
    if (EMAIL_VALIDATION_REGEX.test(email) === false) {
      setEmailValidationState("error");
      return;
    } else {
      setEmailValidationState("none");
    }
  }, 1000);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    // @ts-expect-error: You can extend HTMLFormElement class and use `as` operator for type here if needed.
    const areTermsAccepted = formElement.elements["terms"].checked;
    if (!areTermsAccepted) {
      setCheckboxValidationState("error");
      setIsLoading(false);
      return;
    }

    // Form Submission Code here
    setTimeout(() => {
      // adding timeout to simulate waiting time
      alert(`Logged in ${formData.get("email")}`);
      setIsLoading(false);
    }, 3000);
  };

  return {
    passwordValidationState,
    emailValidationState,
    checkboxValidationState,
    onPasswordChange,
    onEmailChange,
    onFormSubmit,
    isLoading
  };
};
