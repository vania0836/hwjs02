// --- Tabs ---
function show(i) {
    document.querySelectorAll('.panel').forEach((p, j) => p.classList.toggle('active', i === j));
    document.querySelectorAll('.tab').forEach((t, j) => t.classList.toggle('active', i === j));
}

// --- Task 1: Drag & Drop ---
let el = null, offX = 0, offY = 0;

document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('mousedown', e => {
        el = box;
        offX = e.offsetX;
        offY = e.offsetY;
    });
});

document.addEventListener('mousemove', e => {
    if (!el) return;
    const area = document.getElementById('area').getBoundingClientRect();
    el.style.left = (e.clientX - area.left - offX) + 'px';
    el.style.top  = (e.clientY - area.top  - offY) + 'px';
});

document.addEventListener('mouseup', () => el = null);

// --- Task 2: Pizza form ---
let count = 0;

function addPizza() {
    count++;
    const div = document.createElement('div');
    div.className = 'pizza';
    div.id = 'p' + count;
    div.innerHTML = `
    <b>Піца #${count}</b>
    <button onclick="removePizza('p${count}')" style="float:right">✕</button><br>
    <label>Вид:</label>
    <select>
      <option>Маргарита</option>
      <option>Пепероні</option>
      <option>Гавайська</option>
      <option>Чотири сири</option>
    </select><br>
    <label>Додатки:</label>
    <select>
      <option>Без додатків</option>
      <option>Гриби</option>
      <option>Бекон</option>
      <option>Халапеньо</option>
    </select><br>
    <label>Розмір:</label>
    <select>
      <option>Мала</option>
      <option>Середня</option>
      <option>Велика</option>
    </select>
  `;
    document.getElementById('list').appendChild(div);
}

function removePizza(id) {
    document.getElementById(id).remove();
}

function order() {
    const items = document.querySelectorAll('.pizza');
    if (!items.length) { document.getElementById('msg').textContent = 'Додайте піцу!'; return; }
    let result = 'Замовлення: ';
    items.forEach((item, i) => {
        const sel = item.querySelectorAll('select');
        result += `${i + 1}. ${sel[0].value}, ${sel[1].value}, ${sel[2].value}. `;
    });
    document.getElementById('msg').textContent = result;
}

addPizza();
