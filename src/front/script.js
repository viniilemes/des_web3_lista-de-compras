const API_URL = "http://localhost:3000/api/items";

const productNameInput = document.getElementById("product-name");
const productValueInput = document.getElementById("product-value");
const addBtn = document.getElementById("add-btn");
const shoppingList = document.getElementById("shopping-list");

// Carregar lista ao abrir
async function loadItems() {
  shoppingList.innerHTML = "";
  const res = await fetch(API_URL);
  const items = await res.json();

  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - R$ ${item.quantity.toFixed(2)}
      <span class="actions">
        <button class="edit-btn" onclick="editItem('${item._id}', '${item.name}', ${item.quantity})">Editar</button>
        <button class="delete-btn" onclick="deleteItem('${item._id}')">Excluir</button>
      </span>
    `;
    shoppingList.appendChild(li);
  });
}

// Adicionar produto
addBtn.addEventListener("click", async () => {
  const name = productNameInput.value.trim();
  const value = parseFloat(productValueInput.value);

  if (!name || isNaN(value)) {
    alert("Preencha todos os campos!");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, quantity: value })
  });

  productNameInput.value = "";
  productValueInput.value = "";
  loadItems();
});

// Editar produto
async function editItem(id, currentName, currentValue) {
  const newName = prompt("Novo nome:", currentName);
  const newValue = prompt("Novo valor:", currentValue);

  if (!newName || isNaN(newValue)) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, quantity: parseFloat(newValue) })
  });

  loadItems();
}

// Deletar produto
async function deleteItem(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadItems();
}

// Inicializar
loadItems();
