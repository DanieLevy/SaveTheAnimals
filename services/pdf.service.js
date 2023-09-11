import PDFDocument from "pdfkit"
import fs from "fs"

function buildAnimalsPDF(animals) {
  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream("./data/save-the-animals.pdf"))

  animals.forEach((animal) => {
    doc
      .fontSize(25)
      .text(animal.name, 100, 100)
      .fontSize(15)
      .text(`Count: ${animal.count}`, 100, 150)
    animal.imgUrls.forEach((imgUrl, idx) => {
      doc.image(`./imgs/${animal.id}-${idx}.jpg`, 100, 200 + idx * 100, {
        width: 200,
      })
      doc.moveDown(1) // move down half a line
    })
    doc.addPage()
  })

  doc.end()
}

export const pdfService = {
  buildAnimalsPDF,
}
