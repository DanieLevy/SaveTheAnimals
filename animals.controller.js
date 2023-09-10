import { fileService } from "./services/files.service.js"
import { imgService } from "./services/img.service.js"
import { pdfService } from "./services/pdf.service.js"
import { utilService } from "./services/util.service.js"

fileService
  .loadCSV("./data/rare-animals.csv")
  .then((animals) => {
    const promises = animals.map((animal) => {
      return imgService.suggestImgs(animal.name).then((imgUrls) => {
        animal.imgUrls = imgUrls
        return animal
      })
    })
    return Promise.all(promises)
  })
  .then((animalsWithImgUrls) => {
    const promises = animalsWithImgUrls.map((animal) => {
      const promises = animal.imgUrls.map((imgUrl, idx) => {
        const fileName = `./imgs/${animal.id}-${idx}.jpg`
        return utilService.download(imgUrl, fileName)
      })
      return Promise.all(promises).then(() => animal)
    })
    return Promise.all(promises)
  })
  .then((animalsWithImgs) => {
    pdfService.buildAnimalsPDF(animalsWithImgs)
  })
  .then(() => {
    console.log("Done! Check out the PDF")
  })
  .catch((err) => {
    console.log("Something went wrong", err)
  })
