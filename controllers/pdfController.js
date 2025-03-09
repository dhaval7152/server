const PDFDocument = require("pdfkit");
const PdfLog = require("../models/PdfLog");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const sharp = require("sharp");
exports.generatePDF = async (req, res) => {
  try {
    const { products, user } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products selected" });
    }

    const doc = new PDFDocument({ margin: 50, size: "A4" });
    let pdfBuffer = [];

    doc.on("data", (chunk) => pdfBuffer.push(chunk));
    doc.on("end", async () => {
      const finalPDF = Buffer.concat(pdfBuffer);

      try {
        const pdfEntry = new PdfLog({
          user: user ? user.name : "Anonymous",
          filePath: finalPDF,
          timestamp: Date.now(),
        });

        const savedPDF = await pdfEntry.save();
        res.json({
          fileId: savedPDF._id,
          message: "PDF stored successfully in database",
        });
      } catch (error) {
        console.error("Error logging PDF creation:", error);
        res.status(500).json({ error: "Error storing PDF in database" });
      }
    });

    const logoPath = path.join(__dirname, "../public/images/logo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 50, { width: 150 });
    } else {
      doc.fontSize(16).text("tilesview.ai", 50, 50, { align: "left" });
    }

    doc
      .fontSize(10)
      .text("Powered By Tilesview.ai", 400, 50, { align: "right" });

    doc.moveDown(3);

    for (const [index, product] of products.entries()) {
      if (index > 0) doc.addPage();
      let yPos = 120;

      if (product.product_image) {
        try {
          const imagePath = path.join(
            __dirname,
            `../public/${product.product_image}`
          );
          if (fs.existsSync(imagePath)) {
            doc.image(imagePath, 50, yPos, { width: 250 });
          } else if (product.product_image) {
            const response = await axios.get(
              `${process.env.APP_URL}/${product.product_image}`,
              {
                responseType: "arraybuffer",
              }
            );
            let imageBuffer = Buffer.from(response.data);
            imageBuffer = await sharp(imageBuffer).toFormat("jpeg").toBuffer();
            doc.image(imageBuffer, 50, yPos, { width: 250 });
          }
        } catch (error) {
          console.error("Error adding image:", error);
        }
      }
      doc.fontSize(18).text(product.product_name, 320, yPos, { width: 200 });
      doc
        .moveTo(320, yPos + 25)
        .lineTo(520, yPos + 25)
        .strokeColor("red")
        .lineWidth(3)
        .stroke();
      doc.strokeColor("black").lineWidth(1);
      yPos += 50;

      const specs = [
        {
          label: "Size",
          value: product.size || `${product.length} x ${product.width} mm`,
        },
        { label: "Finish Type", value: product.finish_type },
        { label: "Thickness", value: product.thickness || "-" },
      ];

      specs.forEach((spec) => {
        doc.fontSize(12).font("Helvetica-Bold").text(spec.label, 320, yPos);
        doc
          .moveTo(320, yPos + 15)
          .lineTo(380, yPos + 15)
          .stroke();
        doc.font("Helvetica").text(spec.value, 320, yPos + 25);
        yPos += 50;
      });
    }

    doc.end();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};

exports.dowloadPdf = async (req, res) => {
  try {
    const pdfEntry = await PdfLog.findById(req.params.id);
    if (!pdfEntry) {
      return res.status(404).json({ error: "PDF not found" });
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Products-Catalog.pdf"`
    );
    res.status(200).send(pdfEntry.filePath);
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).json({ error: "Error fetching PDF" });
  }
};
