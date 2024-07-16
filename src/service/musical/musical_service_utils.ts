function calculate_age(birthday: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const age_group = Math.floor(age / 10) * 10;
  return age_group;
}

export {calculate_age}