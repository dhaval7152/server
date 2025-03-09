# 🏗️ **Tilesview.ai PDF Generator Service**

A robust and scalable PDF generation service for creating **product catalogs** with **image support**, **MongoDB storage**, and **secure authentication**.

---

## 🚀 **Features**

✅ **Secure Authentication** – JWT-based authentication for secure API access.  
✅ **MongoDB Storage** – Store generated PDFs and retrieve them later.  
✅ **Image Processing** – Support for both local and remote images with automatic format conversion.  
✅ **Company Branding** – Customizable logo integration in generated PDFs.  
✅ **PDF Download API** – Retrieve generated PDFs via a secure endpoint.  
✅ **Optimized PDF Size** – Efficient storage and image compression without quality loss.

---

## 🛠️ **Tech Stack**

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| **Node.js**    | Backend Server                    |
| **Express.js** | API Framework                     |
| **MongoDB**    | Database Storage for PDFs & Users |
| **PDFKit**     | PDF Generation                    |
| **Sharp**      | Image Processing & Optimization   |
| **JWT**        | Secure Authentication             |
| **CORS**       | Cross-Origin Resource Sharing     |
| **dotenv**     | Environment Variable Handling     |

---

## 📥 **Installation**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/dhaval7152/server.git
```

### 2️⃣ Install Dependencies

```bash
cd server && npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 📌 **API Endpoints**

| Endpoint                    | Method   | Authentication | Description                       |
| --------------------------- | -------- | -------------- | --------------------------------- |
| `/api/auth/register`        | **POST** | ❌ No          | Register a new user               |
| `/api/auth/login`           | **POST** | ❌ No          | Authenticate user & get JWT token |
| `/api/auth/verify-token`    | **GET**  | ✅ Yes         | Verify JWT token validity         |
| `/api/auth/profile`         | **GET**  | ✅ Yes         | Get user profile details          |
| `/api/auth/logout`          | **POST** | ✅ Yes         | Logout & invalidate JWT token     |
| `/api/pdf/generate`         | **POST** | ✅ Yes         | Generate a PDF from product data  |
| `/api/pdf/downloadPdf/:id`  | **GET**  | ✅ Yes         | Download a PDF using its file ID  |
| `/api/products/getProducts` | **GET**  | ✅ Yes         | Fetch all stored products         |
| `/api/products/addProduct`  | **POST** | ✅ Yes         | Add a new product to MongoDB      |

---

## 📁 **Project Structure**

```
📦 tilesview-pdf-service
 ┣ 📂 controllers
 ┃ ┣ 📄 authController.js        # User authentication
 ┃ ┣ 📄 pdfController.js         # PDF generation & retrieval
 ┃ ┗ 📄 productController.js     # Product CRUD operations
 ┣ 📂 models
 ┃ ┣ 📄 User.js                  # User Schema
 ┃ ┣ 📄 PdfLog.js                # PDF Storage Schema
 ┃ ┗ 📄 Product.js               # Product Schema
 ┣ 📂 routes
 ┃ ┣ 📄 authRoutes.js            # User authentication routes
 ┃ ┣ 📄 pdfRoutes.js             # PDF-related routes
 ┃ ┗ 📄 productRoutes.js         # Product routes
 ┣ 📂 middleware
 ┃ ┗ 📄 authMiddleware.js        # JWT authentication
 ┣ 📂 config
 ┃ ┗ 📄 db.js                    # MongoDB connection setup
 ┣ 📂 public
 ┃ ┗ 📂 images                   # Static image assets
 ┣ 📄 server.js                   # Main application entry point
 ┣ 📄 .env                        # Environment variables
 ┗ 📄 package.json                # Dependencies & scripts
```

---

## 📜 **PDF Output Format**

Each generated PDF includes:  
📌 **Company Logo** – Custom branding at the top  
📌 **Powered By Tilesview.ai** – Watermark  
📌 **Product Details Per Page**

- 🖼 **Product Image**
- 🏷 **Product Name**
- 📏 **Size & Specifications**
- 🎨 **Finish Type**
- 📌 **Thickness**

---

## 🛠 **Development Setup**

### 1️⃣ Start Development Server

```bash
npm run dev
```

Server starts on **`http://localhost:5000`** (default).

---

## 🚀 **Production Deployment**

### 1️⃣ Start Production Server

```bash
npm start
```

Ensure you configure **MongoDB and environment variables** properly.

---

## 🔐 **Security Considerations**

🔹 **JWT Authentication** – Protects endpoints & user sessions  
🔹 **Secure File Handling** – Stores PDFs efficiently  
🔹 **Optimized PDF Size** – Uses **Sharp** for image compression  
🔹 **Input Validation** – Prevents invalid product data  
🔹 **Error Handling** – Graceful failure on image/PDF processing

---

## 🤝 **Contributing**

Contributions are welcome! Follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`feature-new-pdf-layout`)
3. **Commit your changes**
4. **Push to your branch**
5. **Open a pull request**

---
