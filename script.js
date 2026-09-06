const products = [
  {
    "id": 1,
    "name": "Premium Salmon Cat Food",
    "price": 450,
    "image": "images/salmon-food.png",
    "tagline": "อาหารเม็ดเกรดพรีเมียม บำรุงขนสวยเงางาม ไร้สารเคมีอันตราย"
  },
  {
    "id": 2,
    "name": "Tuna Treat Pack",
    "price": 150,
    "image": "images/tuna-treat.png",
    "tagline": "ขนมแมวเลียรสทูน่าแท้ อร่อยฟิน น้องแมวติดใจทุกซอง"
  },
  {
    "id": 3,
    "name": "5-Tier Wooden Cat Tree",
    "price": 1290,
    "image": "images/cat-tree.png",
    "tagline": "คอนโดไม้ 5 ชั้น แข็งแรงพิเศษ พื้นที่ส่วนตัวให้น้องลับเล็บปีนป่าย"
  },
  {
    "id": 4,
    "name": "Cute House Scratching Board",
    "price": 350,
    "image": "images/scratcher.png",
    "tagline": "บ้านกระดาษลูกฟูกลับเล็บ ดีไซน์น่ารัก นอนสบายไม่ยุบง่าย"
  }
];

let cart = [];

function renderProducts() {
  const container = document.getElementById('product-container');
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img-box">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150?text=Meow+Shop'">
      </div>
      <div class="product-info">
        <div>
          <h3>${p.name}</h3>
          <div class="tagline">${p.tagline}</div>
        </div>
        <div class="price-row">
          <div class="price">${p.price.toLocaleString()} THB</div>
          <button class="btn-add" onclick="addToCart(${p.id})">🛒 ใส่ตะกร้า</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  cart.push(product);
  updateCartUI();
}

function updateCartUI() {
  const itemsContainer = document.getElementById('cart-items');
  const totalBox = document.getElementById('cart-total-box');
  const totalText = document.getElementById('cart-total-text');

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = "ยังไม่มีสินค้าในตะกร้า เลือกช้อปได้เลยครับ!";
    itemsContainer.className = "empty-cart";
    if (totalBox) totalBox.style.display = "none";
    return;
  }

  itemsContainer.className = "";
  let total = 0;

  itemsContainer.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #eee;">
        <span>🐾 <b>${item.name}</b> - <span style="color:#e65100;">${item.price} THB</span></span>
        <button class="btn-remove" onclick="removeFromCart(${index})" style="background:#ff5252; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">ลบ</button>
      </div>
    `;
  }).join('');

  if (totalBox) totalBox.style.display = "block";
  if (totalText) totalText.innerHTML = `ยอดรวมทั้งสิ้น: <span style="color: #e65100;">${total.toLocaleString()} THB</span>`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function checkout() {
  if (cart.length === 0) {
    alert("กรุณาเลือกสินค้าใส่ตะกร้าก่อนครับ!");
    return;
  }

  const customerName = prompt("กรุณากรอกชื่อ-นามสกุลของคุณ (Costumer name):");
  if (!customerName) return;

  const phone = prompt("กรุณากรอกเบอร์โทรศัพท์ (Phone):");
  if (!phone) return;

  const address = prompt("กรุณากรอกที่อยู่จัดส่ง (Ships Address):");
  if (!address) return;

  const payment = prompt("เลือกวิธีชำระเงิน (Payment Method):\nพิมพ์ 1: โอนเงินผ่านธนาคาร\nพิมพ์ 2: เก็บเงินปลายทาง (COD)", "1");
  if (!payment) return;
  const paymentMethod = payment === "2" ? "เก็บเงินปลายทาง (COD)" : "โอนเงินผ่านธนาคาร";

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxy9uxPFGYfwOXSzCK1jaZSv2NpBZs3ghbOqWIwmSLJLDRARqM6kYLKW-c5YJmiijju/exec';
  
  const orderSummary = cart.map(item => item.name).join(', ');
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const formData = new FormData();
  formData.append('customer', customerName);
  formData.append('phone', phone);
  formData.append('address', address);
  formData.append('product', orderSummary);
  formData.append('price', totalPrice);
  formData.append('payment', paymentMethod);
  formData.append('date', new Date().toLocaleString('th-TH'));

  alert('กำลังส่งข้อมูลการสั่งซื้อ...');

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    alert('🎉 สั่งซื้อสินค้าสำเร็จ! บันทึกข้อมูลลง Google Sheet เรียบร้อยครับ 🐾');
    cart = [];
    updateCartUI();
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
  });
}

document.addEventListener('DOMContentLoaded', renderProducts);
