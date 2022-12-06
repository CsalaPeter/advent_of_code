const fs = require("fs");
const datastream = fs.readFileSync("input.txt", "utf-8");

const snipetLength = 4;
const messageLenght = 14;

for (let charPos = 0; charPos < datastream.length - snipetLength; charPos++) {
  const streamPart = datastream.slice(charPos, charPos + snipetLength);
  const uniqueChars = new Set(streamPart).size;
  if (uniqueChars < snipetLength) continue;
  console.log(charPos + snipetLength);
  for (
    let msgPos = charPos + snipetLength;
    msgPos < datastream.length;
    msgPos++
  ) {
    const messagePart = datastream.slice(msgPos, msgPos + messageLenght);
    const msgUniqueChars = new Set(messagePart).size;
    if (msgUniqueChars < messageLenght) {
      continue;
    }
    console.log(msgPos + messageLenght);
    break;
  }
  break;
}
