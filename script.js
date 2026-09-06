const products = [
  {
    "id": 1,
    "name": "Premium Salmon Cat Food",
    "price": 450,
    "image": "images/salmon-food.png",
    "tagline": "✨ สูตรลับเฉพาะแมวโต บำรุงขนสวยเงางาม ไร้สารแต่งเติม"
  },
  {
    "id": 2,
    "name": "Tuna Treat Pack",
    "price": 150,
    "image": "images/tuna-treat.png",
    "tagline": "💖 ขนมแมวเลียยอดฮิต น้องแมวติดใจร้องเหมียวทุกซอง"
  },
  {
    "id": 3,
    "name": "5-Tier Wooden Cat Tree",
    "price": 1290,
    "image": "images/cat-tree.png",
    "tagline": "🏰 คอนโดไม้แท้แข็งแรงพิเศษ พื้นที่ส่วนตัวให้น้องลับเล็บปีนป่าย"
  },
  {
    "id": 4,
    "name": "Cute House Scratching Board",
    "price": 350,
    "image": "images/scratcher.png",
    "tagline": "🏡 บ้านกระดาษรูปทรงสุดคิ้วท์ นอนสบายพร้อมลับเล็บในตัว"
  }
];

let cart = [];

function renderShop() {
  const container = document.getElementById('product-container');
  if (!container) return;

  container.innerHTML = `
    <!-- ป้ายคำโปรยโฆษณา -->
    <div style="background: linear-gradient(135deg, #ff8c00, #ffb74d); color: white; padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(255,140,0,0.3);">
      <h2 style="margin: 0 0 8px 0; font-size: 22px;">🎉 โปรโมชั่นฉลองเปิดร้านใหม่ ส่งฟรีทุกออเดอร์! 🚚</h2>
      <p style="margin: 0; font-size: 14px; opacity: 0.95;">คัดสรรสินค้าคุณภาพเพื่อเจ้านายสี่ขาโดยเฉพาะ ทาสแมวห้ามพลาด 🐾</p>
    </div>

    <!-- ส่วนแสดงรายการสินค้า -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px;">
      ${products.map(p => `
        <div style="background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 6px 20px rgba(0,0,0,0.06); text-align: center; display: flex; flex-direction: column; justify-content: space-between; border: 2px solid #fff3e0;">
          <div>
            <div style="background: #fff8f0; border-radius: 12px; padding: 10px; margin-bottom: 15px; height: 140px; display: flex; align-items: center; justify-content: center;">
              <img src="${p.image}" alt="${p.name}" style="max-height: 120px; max-width: 100%; object-fit: contain;" onerror="this.src='https://via.placeholder.com/150?text=Meow+Shop'">
            </div>
            <h3 style="color: #333; font-size: 17px; margin: 0 0 8px 0;">${p.name}</h3>
            <p style="color: #e65100; font-size: 12px; background: #fff3e0; padding: 6px 10px; border-radius: 6px; margin-bottom: 12px; font-weight: 500;">${p.tagline}</p>
          </div>
          <div>
            <div style="color: #333; font-size: 20px; font-weight: bold; margin-bottom: 15px;">${p.price.toLocaleString()} THB</div>
            <button onclick="addToCart(${p.id})" style="background: linear-gradient(135deg, #ff8c00, #f57c00); color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; box-shadow: 0 4px 10px rgba(255,140,0,0.2);">🛒 เพิ่มลงตะกร้า</button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- ส่วนตะกร้าสินค้า (Cart Box) -->
    <div id="cart-section" style="background: #fafafa; border: 2px dashed #ffb74d; border-radius: 16px; padding: 20px; margin-top: 20px;">
      <h3 style="margin-top: 0; color: #e65100; display: flex; align-items: center; gap: 8px;">🛍️ ตะกร้าสินค้าของคุณ</h3>
      <div id="cart-items" style="color: #666; font-size: 14px; margin-bottom: 15px;">ยังไม่มีสินค้าในตะกร้า</div>
      <div id="cart-total" style="font-weight: bold; font-size: 16px; margin-bottom: 15px; display: none;">ยอดรวม: 0 THB</div>
      <button id="checkout-btn" onclick="checkout()" style="background: #4caf50; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; display: none;">✅ ยืนยันการสั่งซื้อทั้งหมด</button>
    </div>
  `;
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  cart.push(product);
  updateCartUI();
  alert(`เพิ่ม "${product.name}" ลงในตะกร้าแล้วครับ! 🛒`);
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "ยังไม่มีสินค้าในตะกร้า";
    cartTotalContainer.style.display = 'none';
    checkoutBtn.style.display = 'none';
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; background: white; padding: 8px 12px; border-radius: 6px; margin-bottom: 6px; border: 1px solid #eee;">
        <span>🐾 ${item.name} - <b>${item.price} THB</b></span>
        <button onclick="removeFromCart(${index})" style="background: #ff5252; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">ลบ</button>
      </div>
    `;
  }).join('');

  cartTotalContainer.style.display = 'block';
  cartTotalContainer.innerHTML = `ยอดรวมทั้งสิ้น: <span style="color: #e65100;">${total.toLocaleString()} THB</span>`;
  checkoutBtn.style.display = 'block';
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function checkout() {
  if (cart.length === 0) return;

  const customerName = prompt("กรุณากรอกชื่อ-นามสกุลของคุณ:");
  if (!customerName) return;

  const phone = prompt("กรุณากรอกเบอร์โทรศัพท์สำหรับติดต่อกลับ:");
  if (!phone) return;

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxA2e239eM74u-Jj_9J/exec';
  const orderSummary = cart.map(item => item.name).join(', ');
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product: orderSummary,
      price: totalPrice,
      customer: customerName,
      phone: phone,
      date: new Date().toLocaleString('th-TH')
    })
  })
  .then(() => {
    alert('สั่งซื้อสินค้าสำเร็จ! ทางร้านได้รับออเดอร์เรียบร้อยแล้วครับ 🐾');
    cart = [];
    updateCartUI();
  })
  .catch(() => {
    alert('สั่งซื้อสินค้าสำเร็จ!');
    cart = [];
    updateCartUI();
  });
}

document.addEventListener('DOMContentLoaded', renderShop);
