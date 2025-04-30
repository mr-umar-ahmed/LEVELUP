module.exports = async function fakeImageClassifier(imageBuffer) {
  const result = Math.random() > 0.3 ? "valid" : "invalid"; // 70% valid
  return result === "valid";
};
