export const validateUEN = (rule, value, callback) => {
  const reg = /^\d{8}[a-zA-Z]$/;
  if(reg.test(value)){
    callback();
  }else{
    callback('Invalid Company UEN')
  }
}

export const validateEmail = (rule, value, callback) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(reg.test(value)){
    callback();
  }else{
    callback('Enter a valid email')
  }
}

export const validateCompanyName = (rule, value, callback) => {
  if (value?.length >= 2) callback();
  callback('Minimum 2 characters required')
}