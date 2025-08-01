import userModel from "../models/userModel.js";

// Add item to cart


const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    let  userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId]>0) {
      cartData[req.body.itemId] -= 1;

    }
   await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  return res.json({  success: true, message: "Item removed from cart successfully",
     });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

// fetch cart data

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData; 
    res.json({success: true,cartData,});

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });

  }
};

export { addToCart, removeFromCart, getCart };
