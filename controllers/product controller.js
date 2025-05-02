const productModel = require("../models/productModel");

class productController {
    
    async allProducts(req,res){
        try {
            const allProducts = await productModel.find();
            if(allProducts){
                res.status(200).json({
                    success: true,
                    message:"this are all the items",
                    data: allProducts,

                })
            }else{
                res.status(404).json({
                    success: false,
                    message:"unable to find items",
                    data: [],

                })
            }
            
        } catch (error) {
            console.log(error);
        }
        
    };
///////

    async  findById(req,res){
        try {
            const productId= req.params.id;
            const findproductById= await productModel.findById(productId);
            if(findproductById){
                res.status(200).json({
                    success:true,
                    message:"yor product fetched successfully",
                    data:findproductById

                })
            }else{
                res.status(404).json({
                success:false,
                message:"unable to find the product",
                

            })}
        } catch (error) {
            console.log(error)
        }
        
    };
  async addproduct(req, res) {
    try {
      const productdetails = req.body;
      const addproductdetails = await productModel.create(productdetails);
      if (addproductdetails) {
        res.status(200).json({
          success: true,
          message: "your product added sussessy fully",
          data: addproductdetails,
        });
      }else{
        res.status(404).json({
            success:false,
            message:"sorry unable to add data",
            
        })
      }

    } catch (error) {
      console.log(error);
    }
  }
    async deleteProductById(req,res){

        try {

            const productId= req.params.id;
            const deleteproduct= await productModel.findByIdAndDelete(productId);
    
            if(deleteproduct){
                res.status(200).json({
                    success:true,
                    message:"your product deleted successfully",
                    data:deleteproduct,

                })
            }else{
                res.status(400).json({
                    success:false,
                    message:"unable to delete your product",
                })
            }


            
        } catch (error) {
            console.log(error)
        } 

    }

    async editProductBYId(req,res){
        try{
            const productId= req.params.id;
            const productDeatails = req.body;

            const editproduct= await productModel.findByIdAndUpdate(productId,productDeatails,{new:true});

            if(editproduct){
                res.status(200).json({
                    success:true,
                    message:"your product updated successfully",
                    data:editproduct,

                })

            }else{
                res.status(404).json({
                    success:false,
                    message:"unable to update  your product",
                    
                })
            }

        }catch(err){console.log(err)}
    };

    async  allproductuserAdded(req, res) {
        try {
            const allProducts = await productModel.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },
                { $unwind: "$productDetails" }
            ]);
    
            if (allProducts && allProducts.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "These are all the items",
                    data: allProducts,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Unable to find items",
                    data: [],
                });
            }
    
        } catch (error) {
            console.error("Error in allproductuserAdded:", error);
            res.status(500).json({
                success: false,
                message: "Server error while fetching products",
            });
        }
    }
    ////
    async getProductsByLoggedInUser(req, res) {
        try {
            const userId = req.user.id; // from JWT token _id
    
            const userProducts = await productModel.find({ userId });
    
            if (userProducts && userProducts.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Products added by the logged-in user",
                    data: userProducts,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No products found for this user",
                    data: [],
                });
            }
        } catch (error) {
            console.error("Error fetching products for logged-in user:", error);
            res.status(500).json({
                success: false,
                message: "Server error while fetching products",
            });
        }
    }
    


}

module.exports = new productController();
