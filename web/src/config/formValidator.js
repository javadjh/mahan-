import { FormRule } from "antd";

export const requiredForm = {
  required: true,
  message: "این گزینه اجباری میباشد",
};

export const maxForm = (max) => {
  return { max, message: "طول متن بلند میباشد" };
};

export const minForm = (min) => {
  return { min, message: "طول متن کوتاه میباشد" };
};

export const typeForm = (type) => {
  return {
    type,
    message: "ورودی صحیح نمیباشد",
  };
};

export const emailForm = (type) => {
  return {
    type,
    message: "ایمیل صحیح نمیباشد",
  };
};

export const persianRule = () => {
  return {
    validator: persianRuleHandler,
  };
};

export const passwordRule = () => {
  return {
    validator: passwordRuleHandler,
  };
};

export const englishRule = () => {
  return {
    validator: englishRuleHandler,
  };
};

export const englishAndDigitRule = () => {
  return {
    validator: englishAndDigitRuleHandler,
  };
};

export const melliCodeRule = () => {
  return {
    validator: melliCodeRuleHandler,
  };
};

export const numberCompareRule = (name, message, getFieldVaule) => {
  return {
    validator: (_, value) => {
      const compareCase = getFieldVaule(name);
      return compareCase && Number(compareCase) >= Number(value) && value >= 0
        ? Promise.resolve()
        : Promise.reject(new Error(message));
    },
  };
};
export const numberCompareRuleExteraNumber = (
  name,
  message,
  getFieldVaule,
  extraNumber
) => {
  return {
    validator: (_, value) => {
      const compareCase = getFieldVaule(name);
      return compareCase && Number(compareCase) + extraNumber >= Number(value)
        ? Promise.resolve()
        : Promise.reject(new Error(message));
    },
  };
};

const persianRuleHandler = (_, value) => {
  return just_persian(value)
    ? Promise.resolve()
    : Promise.reject(new Error("فقط کاراکترهای فارسی مجاز است"));
};

const passwordRuleHandler = (_, value) => {
  return just_password(value)
    ? Promise.resolve()
    : Promise.reject(
        new Error(
          "کلمه عبور باید حداقل حاوی ۶ کارکتر، شامل حروف کوچک و بزرگ انگلیسی، عدد و نماد باشد"
        )
      );
};

const englishRuleHandler = (_, value) => {
  return just_english(value)
    ? Promise.resolve()
    : Promise.reject(new Error("فقط کاراکترهای انگلیسی مجاز است"));
};

const englishAndDigitRuleHandler = (_, value) => {
  return just_english_and_digit(value)
    ? Promise.resolve()
    : Promise.reject(new Error("فقط کاراکترهای انگلیسی و اعداد مجاز است"));
};

const melliCodeRuleHandler = (_, value) => {
  return melliCodeValidator(value)
    ? Promise.resolve()
    : Promise.reject(new Error("کدملی نامعتبر است"));
};

const just_persian = (str) => {
  let p = /^[\u0600-\u06FF\s]+$/;

  if (!p.test(str)) {
    return false;
  } else {
    return true;
  }
};

const just_password = (str) => {
  let p = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  return p.test(str);
};

const just_english = (str) => {
  let p = /^[a-zA-Z şüöı _ -]+$/;

  if (!p.test(str)) {
    return false;
  } else {
    return true;
  }
};

const just_english_and_digit = (str) => {
  let p = /^[a-zA-Z şüöı _ - 0-9]+$/;

  if (!p.test(str)) {
    return false;
  } else {
    return true;
  }
};

const melliCodeValidator = (value) => {
  if (value?.length !== 10) {
    return false;
  } else {
    let L = value.length;

    if (L < 8 || parseInt(value, 10) == 0) return false;
    value = ("0000" + value).substr(L + 4 - 10);
    if (parseInt(value.substr(3, 6), 10) == 0) return false;
    let c = parseInt(value.substr(9, 1), 10);
    let s = 0;
    for (let i = 0; i < 9; i++)
      s += parseInt(value.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    let isValid = (s < 2 && c === s) || (s >= 2 && c === 11 - s);
    if (isValid) {
      return true;
    }
    return false;
  }
};

export const justNumberForm = () => {
  return { pattern: new RegExp("^[0-9]*$"), message: "لطفا عدد وارد کنید" };
};

export const justPersianForm = () => {
  return {
    pattern: new RegExp("/^[\u0600-\u06FF\\s]+$/"),
    message: "لطفا فارسی وارد کنید",
  };
};
