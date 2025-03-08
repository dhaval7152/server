const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const PdfLog = require("../models/PdfLog");
const sharp = require("sharp");
require("dotenv").config();
exports.generatePDF = async (req, res) => {
  try {
    const { products, user } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products selected" });
    }

    const pdfDir = path.join(__dirname, "../pdfs");
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    const fileName = `Products-Catelog-${Date.now()}.pdf`;
    const filePath = path.join(pdfDir, fileName);

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

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
      if (index > 0) {
        doc.addPage();
      }

      let yPos = 120;

      if (product.product_image) {
        try {
          const imagePath = path.join(
            __dirname,
            `../public${product.product_image}`
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
        {
          label: "Finish Type",
          value: product.finish_type,
        },
        { label: "Thickness", value: product.thickness || "-" },
      ];

      specs.forEach((spec, i) => {
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .text(spec.label, 320, yPos, { continued: false });
        doc.moveDown(0.2);

        doc
          .moveTo(320, yPos + 15)
          .lineTo(380, yPos + 15)
          .stroke();

        doc.font("Helvetica").text(spec.value, 320, yPos + 25);

        yPos += 50;
      });

      // if (product.product_image) {
      //   try {
      //     const thumbnailPath = product.thumbnail_url || product.product_image;
      //     const imagePath = path.join(__dirname, `../public${thumbnailPath}`);
      //     if (fs.existsSync(imagePath)) {
      //       doc.image(imagePath, 320, yPos, { width: 100 });
      //     } else if (thumbnailPath.startsWith("http")) {
      //       const response = await axios.get(thumbnailPath, {
      //         responseType: "arraybuffer",
      //       });
      //       const imageBuffer = Buffer.from(response.data);
      //       doc.image(imageBuffer, 320, yPos, { width: 100 });
      //     }
      //   } catch (error) {
      //     console.error("Error adding thumbnail:", error);
      //   }
      // }
    }

    try {
      await PdfLog.create({
        user: user ? user.name : null,
        filePath: filePath,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error logging PDF creation:", error);
    }

    doc.end();

    stream.on("finish", () => {
      res.json({
        filePath: `/pdfs/${fileName}`,
        message: "PDF generated successfully",
      });
    });

    stream.on("error", (err) => {
      console.error("Stream error:", err);
      res.status(500).json({ error: "Error saving PDF" });
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};
