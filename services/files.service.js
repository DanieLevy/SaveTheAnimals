import fs from "fs"
import csv from "csv-parser"

export const fileService = {
  loadCSV,
}

function loadCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const trimmedData = {}
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            trimmedData[key.trim()] = data[key].trim()
          }
        }
        results.push(trimmedData)
      })
      .on("end", () => {
        resolve(results)
      })
      .on("error", (err) => {
        reject(err)
      })
  })
}
