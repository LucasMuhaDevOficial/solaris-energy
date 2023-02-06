function maskPhoneNumber(phoneNumber: string) {
  let maskedPhoneNumber = phoneNumber.replace(/\D/g, '')

  maskedPhoneNumber = maskedPhoneNumber.slice(0, 11)

  if (maskedPhoneNumber.length === 0) {
    maskedPhoneNumber = ''
  } else if (maskedPhoneNumber.length < 4) {
    maskedPhoneNumber = '(' + maskedPhoneNumber
  } else if (maskedPhoneNumber.length === 4) {
    maskedPhoneNumber = '(' + maskedPhoneNumber + ')'
  } else if (maskedPhoneNumber.length < 8) {
    maskedPhoneNumber =
      '(' + maskedPhoneNumber.slice(0, 2) + ') ' + maskedPhoneNumber.slice(2)
  } else if (maskedPhoneNumber.length === 8) {
    maskedPhoneNumber =
      '(' +
      maskedPhoneNumber.slice(0, 2) +
      ') ' +
      maskedPhoneNumber.slice(2) +
      '-'
  } else {
    maskedPhoneNumber =
      '(' +
      maskedPhoneNumber.slice(0, 2) +
      ') ' +
      maskedPhoneNumber.slice(2, 7) +
      '-' +
      maskedPhoneNumber.slice(7)
  }
  return maskedPhoneNumber
}

function maskZipCode(zipCode: string) {
  let maskedZipCode = zipCode.replace(/\D/g, '')
  maskedZipCode = maskedZipCode.slice(0, 8)
  if (maskedZipCode.length > 5) {
    maskedZipCode = maskedZipCode.slice(0, 5) + '-' + maskedZipCode.slice(5)
  }

  return maskedZipCode
}

function maskCpfNumber(cpfNumber: string) {
  let maskedCpfNumber = cpfNumber.replace(/\D/g, '')

  maskedCpfNumber = maskedCpfNumber.slice(0, 11)

  if (maskedCpfNumber.length > 9) {
    maskedCpfNumber =
      maskedCpfNumber.slice(0, 9) + '-' + maskedCpfNumber.slice(9)
  }
  if (maskedCpfNumber.length > 6) {
    maskedCpfNumber =
      maskedCpfNumber.slice(0, 6) + '.' + maskedCpfNumber.slice(6)
  }
  if (maskedCpfNumber.length > 3) {
    maskedCpfNumber =
      maskedCpfNumber.slice(0, 3) + '.' + maskedCpfNumber.slice(3)
  }
  return maskedCpfNumber
}

function removeMask(value: string) {
  return value.replace(/\D/g, '')
}

export { maskPhoneNumber, maskZipCode, maskCpfNumber, removeMask }
