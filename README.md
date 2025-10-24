# 💊 Counterfeit Drug Detection using QR Code & Blockchain Verification

## 📌 Overview
This project is a **Counterfeit Drug Detection System** that uses **QR code scanning** and **Blockchain Verification** to ensure medicine authenticity.  
When a QR code on a medicine package is scanned, the system verifies:
- **Authenticity** (Blockchain-backed verification)
- **Expiry Date**
- **Manufacturer Details**

This prototype simulates the **RFID/QR-based verification process** with a secure backend (PostgreSQL + Blockchain simulation).

---



## ✨ Key Features

- **Secure User Authentication:** Separate login and registration flows for Manufacturers and Pharmacists.
- **Blockchain Integration:** All medicine registrations and verifications are recorded as transactions on a secure blockchain, ensuring data integrity.
- **Medicine Registration:** Manufacturers can register new medicines with unique details like name and batch number, creating a permanent record on the blockchain.
- **Instant Verification:** Pharmacists can instantly verify a medicine's authenticity by searching its details.
- **Transparent Logging:** All verification activities are logged and publicly viewable, providing a transparent audit trail.
- **PDF Export:** Verification logs can be exported as a PDF for documentation and reporting.
- **Fully Responsive Design:** A clean and modern user interface that works seamlessly on both desktop and mobile devices.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [React](https://reactjs.org/) (via Create React App)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Icons:** [Heroicons](https://heroicons.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) & [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Supabase)
- **Blockchain Simulation:** Custom implementation
- **QR Code Scanning:** QR code reader integration
- **Environment:** `.env` for secure configuration

---

## 📂 Project Structure
``` bash
counterfeit-drug-detection/
│── backend/
│ ├── app.js # Main server file
│ ├── routes/
│ │ ├── medicineRoutes.js
│ │ ├── blockchainRoutes.js
│ ├── controllers/
│ │ ├── medicineController.js
│ │ ├── blockchainController.js
│ ├── models/
│ │ ├── medicineModel.js
│ │ ├── blockchainModel.js
│ ├── db.js # Database connection
│ ├── package.json
│── database/
│ ├── schema.sql # PostgreSQL schema
│── README.md
│── .env.example
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/counterfeit-drug-detection.git
cd counterfeit-drug-detection

npm install
```
---

## Create .env file
```bash
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=db.mvzxffhbtzqksdgdmbze.supabase.co
DB_PORT=5432
DB_NAME=postgres
PORT=5000
```
---
## API Documentation
- 1. Add a New Medicine
##  Endpoint:

``` bash

POST /api/medicine
Request Body:

{
  "name": "Paracetamol",
  "manufacturer": "ABC Pharma Ltd",
  "batch_number": "BATCH1234",
  "expiry_date": "2026-05-10",
  "qr_code": "https://example.com/qr/BATCH1234"
}
```
---
Response:

``` bash
{
  "message": "Medicine added successfully",
  "data": {
    "id": 1,
    "name": "Paracetamol",
    "manufacturer": "ABC Pharma Ltd",
    "batch_number": "BATCH1234",
    "expiry_date": "2026-05-10",
    "qr_code": "https://example.com/qr/BATCH1234",
    "blockchain_hash": "0xabc123xyz456"
  }
}

```
---
2. Verify Medicine via QR Code
``` bash

GET /api/medicine/verify?qr_code=https://example.com/qr/BATCH1234
Response:

{
  "authentic": true,
  "medicine": {
    "name": "Paracetamol",
    "manufacturer": "ABC Pharma Ltd",
    "expiry_date": "2026-05-10"
  },
  "blockchain_verified": true
}
```
---
3. Get All Medicines
---
``` bash
GET /api/medicine
Response:

[
  {
    "id": 1,
    "name": "Paracetamol",
    "manufacturer": "ABC Pharma Ltd",
    "expiry_date": "2026-05-10"
  }
]
```
---

## 🚀 Deployment

The frontend of this application is configured for easy deployment on [Vercel](https://vercel.com/).

---
## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Fork the repository

Create a new branch (feature-branch)

Commit your changes

Push to your branch

Create a Pull Request

---

## 📧 Contact
For queries or collaboration:

Name: Sadmaan Warshi

Email:spwarshi@gmail.com

Live Link: https://pharma-chain-two.vercel.app



