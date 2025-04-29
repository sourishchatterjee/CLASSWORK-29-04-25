const express = require('express');
const router = express.Router();
const productController= require('../controllers/product controller');
const studentcontoller= require('../controllers/user.controller');
const authCheck=require('../middleware/auth.check')()



router.get('/allitem',productController.allProducts);
router.post('/add', authCheck.authenticateJWTcheck,productController.addproduct);
router.get('/itembyid/:id',productController.editProductBYId)
router.get('/delete/:id',productController.deleteProductById);
router.put('/edit/:id',productController.editProductBYId)


router.post('/sharingusedetails',studentcontoller.register);
router.post('/login',studentcontoller.signin);
router.post('/alldetails',authCheck.authenticateJWTcheck,productController.allproductuserAdded);


module.exports = router;







// route.post('/register',fileUploader.upload().single("image"),studentcontoller.register);
// route.post('/otpverify',studentcontoller.otpVerification);

 
//  route.get('/userById/:id',authCheck.authenticateJWTcheck,studentcontoller.getUserById);
//  route.post('/updateuser/:id',authCheck.authenticateJWTcheck,fileUploader.upload().single("image"),studentcontoller.updateUserData);



// module.exports= route;