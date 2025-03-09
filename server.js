require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pdf", require("./routes/pdfRoutes"));
// app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));
app.use(
  "/pdfs",
  express.static(path.join(__dirname, "pdfs"), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === ".pdf") {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${path.basename(filePath)}"`
        );
      }
    },
  })
);
app.use("/api/products", require("./routes/productRoutes"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
