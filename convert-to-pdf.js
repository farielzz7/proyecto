// Instalar primero: npm install puppeteer
const puppeteer = require("puppeteer")
const fs = require("fs")
const path = require("path")

async function convertHTMLToPDF() {
  try {
    // Lanzar navegador
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Leer el archivo HTML
    const htmlPath = path.join(__dirname, "portada-documento.html")
    const htmlContent = fs.readFileSync(htmlPath, "utf8")

    // Cargar el contenido HTML
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    // Configurar opciones del PDF
    const pdfOptions = {
      path: "documento-goplan-analisis.pdf",
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
    }

    // Generar PDF
    await page.pdf(pdfOptions)

    // Cerrar navegador
    await browser.close()

    console.log("PDF generado exitosamente: documento-goplan-analisis.pdf")
  } catch (error) {
    console.error("Error al generar PDF:", error)
  }
}

// Ejecutar la conversión
convertHTMLToPDF()
