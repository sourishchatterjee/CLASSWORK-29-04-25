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
router.get('/myproducts', authCheck.authenticateJWTcheck, productController.getProductsByLoggedInUser);
router.post('/allproducts',authCheck.authenticateJWTcheck,productController.allproductuserAdded);



module.exports = router;






