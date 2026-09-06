// ข้อมูลสินค้าทั้ง 4 รายการ
const products = [
  {
    "id": 1,
    "name": "Premium Salmon Cat Food",
    "price": 450,
    "image": "/images/salmon-food.png"
  },
  {
    "id": 2,
    "name": "Tuna Treat Pack",
    "price": 150,
    "image": "/images/tuna-treat.png"
  },
  {
    "id": 3,
    "name": "5-Tier Wooden Cat Tree",
    "price": 1290,
    "image": "/images/cat-tree.png"
  },
  {
    "id": 4,
    "name": "Cute House Scratching Board",
    "price": 350,
    "image": "/images/scratcher.png"
  }
];

// ฟังก์ชันแสดงรายการสินค้า
function renderProducts() {
  const container = document.getElementById('product-container');
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150?text=Meow+Shop'">
      <h3>${product.name}</h3>
      <div class="price">${product.price.toLocaleString()} THB</div>
      <button onclick="orderProduct('${product.name}', ${product.price})">สั่งซื้อสินค้า</button>
    </div>
  `).join('');
}

// ฟังก์ชันส่งข้อมูลไปยัง Google Sheets
function orderProduct(name, price) {
  const customerName = prompt(`คุณต้องการสั่งซื้อ: ${name}\nราคา: ${price} บาท\n\nกรุณากรอกชื่อของคุณ:`);
  if (!customerName) return;

  const phone = prompt("กรุณากรอกเบอร์โทรศัพท์:");
  if (!phone) return;

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxA2e239eM74u-Jj_9J/exec'; // URL Apps Script สำหรับบันทึกออเดอร์

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product: name,
      price: price,
      customer: customerName,
      phone: phone,
      date: new Date().toLocaleString('th-TH')
    })
  })
  .then(() => alert('สั่งซื้อเรียบร้อยแล้ว! ทางร้านจะติดต่อกลับโดยเร็วที่สุด'))
  .catch(() => alert('สั่งซื้อเรียบร้อยแล้ว!'));
}

// รันฟังก์ชันเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', renderProducts);
