export default function validatorString(text) {
  const errorFields = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let validation = false;

  for (const field of errorFields) {
    if (text.includes(field)) {
      validation = true;
    }
  }

  return validation;
}
