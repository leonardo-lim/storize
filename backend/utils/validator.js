const isUsername = username => {
  for (let i = 0; i < username.length; i++) {
    if ((username[i] >= 'a' && username[i] <= 'z') || (username[i] >= '0' && username[i] <= '9') || username[i] === '.' || username[i] === '-' || username[i] === '_') {
      continue;
    } else {
      return false;
    }
  }

  return true;
};

module.exports = isUsername;