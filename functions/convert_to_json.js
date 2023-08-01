const fs = require("fs");

const readFileAndConvertToJson = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.trim().split("\n");
    const jsonData = [];

    lines.forEach((line) => {
      const [id, nameWithCommas, latitude, longitude] = line.trim().split(",");
      const name = nameWithCommas.replace(/-[^\w\s]/g, "").trim(); // Remove non-word and non-space characters after a hyphen
      jsonData.push({
        id: parseInt(id),
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
    });

    return jsonData;
  } catch (error) {
    console.error("Error reading or processing the file:", error);
    return null;
  }
};

const filePath = "stops.txt"; // Replace this with the actual path of your .txt file
const jsonData = readFileAndConvertToJson(filePath);
if (jsonData) {
  const jsonString = JSON.stringify(jsonData, null, 2);
  console.log(jsonString);
}
