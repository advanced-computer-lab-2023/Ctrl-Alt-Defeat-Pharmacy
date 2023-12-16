const Pharmacist = require('../Models/Pharmacist');
const Medicine = require('../Models/Medicine');
const Order = require('../Models/Order');

const path = require('path');
const multer = require('multer');

const multerStorage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/PharmacistDocuments');
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split('/')[1];
    cb(null, `pharmacist-${req.body.username}.${ext}`);
  },
});

const upload2 = multer({ storage: multerStorage2 }).array('Documents', 100);

exports.uploadPharmacistDocuments = upload2;

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image/medicine');
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split('/')[1];
    cb(null, `medicine-${req.params.id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

try {
  exports.uploadMedicinePicture = upload.single('picture');
} catch (error) {
  console.error('Multer Error:', error);
}

calculateTotalSalesForMonth = async chosenMonth => {
  try {
    const chosenDate = new Date(chosenMonth);

    const firstDayOfMonth = new Date(chosenDate.getFullYear(), chosenDate.getMonth(), 1);

    const lastDayOfMonth = new Date(chosenDate.getFullYear(), chosenDate.getMonth() + 1, 0, 23, 59, 59, 999);

    const totalSales = await Order.aggregate([
      {
        $match: {
          Date: {
            $gte: firstDayOfMonth,
            $lte: lastDayOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);

    if (totalSales.length > 0) {
      return totalSales[0].totalSales;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total sales:', error);
    throw error;
  }
};
exports.getTotalSalesPerMonth = async (req, res) => {
  try {
    const { month } = req.params;
    const totalSales = await calculateTotalSalesForMonth(month);

    res.status(200).json({
      status: 'success',
      totalSales,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.registerPharmacist = async (req, res) => {
  try {
    let newPharma = req.body;

    if (req.files) {
      newPharma.Documents = req.files.map(file => file.filename);
    }
    const newPharmacist = await Pharmacist.create(newPharma);
    newPharmacist.registrationStatus = 'pending';
    res.status(201).json({
      message: 'pending approval of the new pharmacist',
      data: newPharmacist,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message, // Provide a more informative error message
    });
  }
};

exports.getMedicineQuantitySales = async (req, res) => {
  try {
    const returnedMedicine = await Medicine.find().select('picture name quantity sales');
    res.status(200).json({
      status: 'success',
      data: returnedMedicine,
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};
exports.addMedicine = async (req, res) => {
  try {
    const existingMedicine = await Medicine.findOne({ name: req.body.name });

    if (!existingMedicine) {
      let newMed = req.body;

      if (req.file) {
        newMed.picture = req.file.filename;
      }
      const newMedicine = await Medicine.create(newMed);

      return res.status(200).json({
        status: 'success',
        data: newMedicine,
      });
    } else {
      existingMedicine.quantity += parseInt(req.body.quantity);
      const updatedMedicine = await existingMedicine.save();

      return res.status(200).json({
        status: 'success',
        data: updatedMedicine,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    let update = req.body;

    if (req.file) {
      update.picture = req.file.filename;
    }

    const updatedMedicine = await Medicine.findOneAndUpdate({ name: req.params.id }, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({
      status: 'success',
      data: updatedMedicine,
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.viewWallet = async (req, res) => {
  try {
    const user = await Pharmacist.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ wallet: user.wallet, message: 'Wallet balance retrieved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
