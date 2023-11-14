const express = require('express');
const multer = require('multer');
const PharmacistController = require('../Controllers/PharmacistController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');
const fs = require('fs');
const path = require('path');


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadFolder = path.join(__dirname, '../uploads'); // The folder where files will be saved (inside your project)
  
      // Check if the 'uploads' folder exists, and create it if not
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
      }
  
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp
    },
  });
  
  const upload = multer({ storage });

router.route('/register').post(PharmacistController.registerPharmacist);
router.route('/quantities').get(protect, restrictTo('pharmacist'), PharmacistController.getMedicineQuantitySales);
router.route('/addMedicine').post(protect, restrictTo('pharmacist'), PharmacistController.addMedicine);
router.route('/editMedicine/:id').patch(protect, restrictTo('pharmacist'), PharmacistController.updateMedicine);
router.route('/uploadDocuments').post(protect, restrictTo('pharmacist'),upload.array('documents'), PharmacistController.uploadDocuments);
 
module.exports = router;
