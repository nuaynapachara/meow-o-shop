const products = [
  {
    "id": 1,
    "name": "Premium Salmon Cat Food",
    "price": 450,
    "emoji": "🐟",
    "desc": "อาหารเม็ดเกรดพรีเมียม บำรุงขนและผิวหนัง"
  },
  {
    "id": 2,
    "name": "Tuna Treat Pack",
    "price": 150,
    "emoji": "🐱",
    "desc": "ขนมแมวเลียรสทูน่า แสนอร่อย ทาสแมวปลื้ม"
  },
  {
    "id": 3,
    "name": "5-Tier Wooden Cat Tree",
    "price": 1290,
    "emoji": "🪵",
    "desc": "คอนโดแมวไม้ 5 ชั้น แข็งแรง ทนทาน ไม่พังง่าย"
  },
  {
    "id": 4,
    "name": "Cute House Scratching Board",
    "price": 350,
    "emoji": "📦",
    "desc": "บ้านกระดาษลูกฟูกลับเล็บ ดีไซน์น่ารัก"
  }
];

function renderProducts() {
  const container = document.getElementById('product-container');
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="product-card" style="background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center; transition: transform 0.2s;">
      <div style="font-size: 64px; margin-bottom: 10px; background: #fff8f0; border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; margin-left: auto; margin-right: auto;">
        ${product.emoji}
      </div>
      <h3 style="color: #333; font-size: 18px; margin: 10px 0;">${product.name}</h3>
      <p style="color: #666; font-size: 13px; min-height: 36px;">${product.desc}</p>
      <div class="price" style="color: #e65100; font-size: 20px; font-weight: bold; margin: 15px 0;">${product.price.toLocaleString()} THB</div>
      <button onclick="orderProduct('${product.name}', ${product.price})" style="background-color: #ff8c00; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%;">สั่งซื้อสินค้า</button>
    </div>
  `).join('');
}

function orderProduct(name, price) {
  const customerName = prompt(`คุณต้องการสั่งซื้อ: ${name}\nราคา: ${price} บาท\n\nกรุณากรอกชื่อของคุณ:`);
  if (!customerName) return;

  const phone = prompt("กรุณากรอกเบอร์โทรศัพท์:");
  if (!phone) return;

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxA2e239eM74u-Jj_9J/exec';

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

document.addEventListener('DOMContentLoaded', renderProducts);
