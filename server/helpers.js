const generateHMSetArray = (website) => {
  const hmSetArray = []

  for (const property in website) {
    hmSetArray = hmSetArray.concat([property, website[property]])
  }

  return hmSetArray
}

module.exports = generateHMSetArray
