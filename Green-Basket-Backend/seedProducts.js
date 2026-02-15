import mongoose from 'mongoose';
import Products from './models/productDetailsSchema.js'
import 'dotenv/config'

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("database connected successfully")})
    .catch((err)=>{console.error(err)})


const sampleProducts = [
  // 🍎 FRUITS (4)
  {
    name: "Apple",
    image: { url: "https://img.icons8.com/color/400/apple.png", alt: "Apple" },
    description: "Crisp red apples, perfect for snacking.",
    category: "fruits",
    shop: "Fresh Farm Market",
    units: "1 kg",
    price: 120,
    inStock: true,
    quantity: 0,
    averageRating: 4.6,
    totalReviews: 210,
    totalSold: 1100
  },
  {
    name: "Banana",
    image: { url: "https://img.icons8.com/color/400/banana.png", alt: "Banana" },
    description: "Sweet ripe bananas, great for smoothies.",
    category: "fruits",
    shop: "Fresh Farm Market",
    units: "1 dozen",
    price: 60,
    inStock: true,
    quantity: 0,
    averageRating: 4.5,
    totalReviews: 180,
    totalSold: 980
  },
  {
    name: "Orange",
    image: { url: "https://img.icons8.com/color/400/orange.png", alt: "Orange" },
    description: "Juicy oranges full of vitamin C.",
    category: "fruits",
    shop: "Fresh Farm Market",
    units: "1 kg",
    price: 80,
    inStock: true,
    quantity: 0,
    averageRating: 4.4,
    totalReviews: 150,
    totalSold: 780
  },
  {
    name: "Grapes",
    image: { url: "https://img.icons8.com/color/400/grapes.png", alt: "Grapes" },
    description: "Fresh seedless grapes for snacks.",
    category: "fruits",
    shop: "Fresh Farm Market",
    units: "500 gm",
    price: 90,
    inStock: true,
    quantity: 0,
    averageRating: 4.3,
    totalReviews: 120,
    totalSold: 650
  },

  // 🥦 VEGETABLES (4)
  {
    name: "Tomato",
    image: { url: "https://img.icons8.com/color/400/tomato.png", alt: "Tomato" },
    description: "Fresh red tomatoes for cooking.",
    category: "vegetables",
    shop: "Local Veggie Hub",
    units: "1 kg",
    price: 50,
    inStock: true,
    quantity: 0,
    averageRating: 4.2,
    totalReviews: 85,
    totalSold: 760
  },
  {
    name: "Potato",
    image: { url: "https://img.icons8.com/color/400/potato.png", alt: "Potato" },
    description: "Potatoes for everyday cooking.",
    category: "vegetables",
    shop: "Local Veggie Hub",
    units: "1 kg",
    price: 40,
    inStock: true,
    quantity: 0,
    averageRating: 4.1,
    totalReviews: 100,
    totalSold: 840
  },
  {
    name: "Carrot",
    image: { url: "https://img.icons8.com/color/400/carrot.png", alt: "Carrot" },
    description: "Crunchy carrots rich in vitamins.",
    category: "vegetables",
    shop: "Local Veggie Hub",
    units: "1 kg",
    price: 55,
    inStock: true,
    quantity: 0,
    averageRating: 4.3,
    totalReviews: 90,
    totalSold: 620
  },
  {
    name: "Onion",
    image: { url: "https://img.icons8.com/color/400/onion.png", alt: "Onion" },
    description: "Fresh onions for everyday recipes.",
    category: "vegetables",
    shop: "Local Veggie Hub",
    units: "1 kg",
    price: 45,
    inStock: true,
    quantity: 0,
    averageRating: 4.0,
    totalReviews: 95,
    totalSold: 780
  },

  // 🍪 SNACKS (4)
  {
    name: "Popcorn",
    image: { url: "https://img.icons8.com/color/400/popcorn.png", alt: "Popcorn" },
    description: "Light and crunchy popcorn snack.",
    category: "snacks",
    shop: "Snack World",
    units: "200 gm",
    price: 35,
    inStock: true,
    quantity: 0,
    averageRating: 4.3,
    totalReviews: 100,
    totalSold: 410
  },
  {
    name: "Cookies",
    image: { url: "https://img.icons8.com/color/400/cookie.png", alt: "Cookies" },
    description: "Sweet chocolate chip cookies.",
    category: "snacks",
    shop: "Snack World",
    units: "150 gm",
    price: 50,
    inStock: true,
    quantity: 0,
    averageRating: 4.4,
    totalReviews: 110,
    totalSold: 520
  },
  

  // 🌾 GROCERY (4)
  {
    name: "Rice",
    image: { url: "https://img.icons8.com/color/400/rice-bowl.png", alt: "Rice" },
    description: "White rice grains.",
    category: "grocery",
    shop: "Golden Grains Store",
    units: "5 kg",
    price: 620,
    inStock: true,
    quantity: 0,
    averageRating: 4.7,
    totalReviews: 400,
    totalSold: 2400
  },
  {
    name: "Wheat",
    image: { url: "https://img.icons8.com/color/400/wheat.png", alt: "Wheat" },
    description: "Whole wheat grains.",
    category: "grocery",
    shop: "Golden Grains Store",
    units: "10 kg",
    price: 400,
    inStock: true,
    quantity: 0,
    averageRating: 4.5,
    totalReviews: 320,
    totalSold: 1800
  },
  
  {
    name: "Cooking Oil",
    image: { url: "https://img.icons8.com/color/400/olive-oil.png", alt: "Cooking Oil" },
    description: "Assorted cooking oils.",
    category: "grocery",
    shop: "Golden Grains Store",
    units: "1 litre",
    price: 160,
    inStock: true,
    quantity: 0,
    averageRating: 4.4,
    totalReviews: 250,
    totalSold: 1100
  },

  // 🥤 BEVERAGES (4)
  {
    name: "Tea",
    image: { url: "https://img.icons8.com/color/400/tea.png", alt: "Tea" },
    description: "Hot brewed tea.",
    category: "beverages",
    shop: "Healthy Sip",
    units: "250 gm",
    price: 150,
    inStock: true,
    quantity: 0,
    averageRating: 4.6,
    totalReviews: 300,
    totalSold: 1300
  },
  {
    name: "Mineral Water",
    image: { url: "https://img.icons8.com/color/400/water-bottle.png", alt: "Mineral Water" },
    description: "Pure mineral water.",
    category: "beverages",
    shop: "Healthy Sip",
    units: "1 litre",
    price: 25,
    inStock: true,
    quantity: 0,
    averageRating: 4.6,
    totalReviews: 200,
    totalSold: 980
  }
];



const seedProducts = async()=>{
    try{
      await Products.deleteMany()
    const data = await Products.insertMany(sampleProducts)
    console.log(`${sampleProducts.length} products inserted successfully`);
    mongoose.connection.close(); }
    catch(err){
        console.error(err);
        mongoose.connection.close();
    }

}
seedProducts();