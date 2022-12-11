const Product = require('../models/product');

const show_product=async(req,res)=>{
    try {
        const product= await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const product_byID= async(req,res)=>{
    res.status(201).json(res.reqProduct);
    }

const add_product=async(req,res)=>{
    
    const {productName , Description, isAvailable,Quantity}= req.body;
    const newProduct = new Product({productName , Description, isAvailable,Quantity});
    try {
     const savedProduct = await newProduct.save();
     res.status(201).json(savedProduct);
    } catch (error) {
     res.status(400).json({message:error.message});
    }
 
 }

 const remove_product=async (req, res) => {
    try {
      await res.reqProduct.remove();
      res.status(200).json({ message: 'Deleted product' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const modify_product=async (req, res) => {
  
    if(req.body.name!=null)
    {res.reqProduct.name = req.body.name}
    if(req.body.Description!=null)
    {res.reqProduct.Description = req.body.Description}
    if(req.body.isAvailable!=null)
    {res.reqProduct.isAvailable = req.body.isAvailable}
    if(req.body.Quantity!=null)
    {res.reqProduct.Quantity=req.body.isAvailable}
    try {
    const updatedproduct = await res.reqProduct.save();
    res.status(200).json(updatedproduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//middleware function to get product object from id
    const getproduct=async(req, res, next)=> {
    let reqProduct
    try {
      reqProduct = await Product.findById(req.params.id)
      if (reqProduct == null) {
        return res.status(404).json({ message: 'Cannot find product' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.reqProduct = reqProduct;
    next()
  };

  module.exports={show_product,product_byID,add_product,remove_product,modify_product,getproduct};