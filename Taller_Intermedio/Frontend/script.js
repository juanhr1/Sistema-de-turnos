const API_BASE = 'http://localhost:3000/api';
let products = [];
let editingId = null;

// Elementos del DOM
const productForm = document.getElementById('productForm');
const productsTable = document.getElementById('productsTable');
const searchInput = document.getElementById('search');
const lowStockBtn = document.getElementById('lowStockBtn');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

function setupEventListeners() {
    productForm.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', filterProducts);
    lowStockBtn.addEventListener('click', showLowStock);
}

async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        products = await response.json();
        renderProducts(products);
        updateLowStockButton();
    } catch (error) {
        console.error('Error cargando productos:', error);
        showMessage('Error al cargar productos', 'error');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value
    };

    try {
        let response;
        if (editingId) {
            response = await fetch(`${API_BASE}/products/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        } else {
            response = await fetch(`${API_BASE}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }

        if (response.ok) {
            resetForm();
            loadProducts();
            showMessage(editingId ? 'Producto actualizado ✅' : 'Producto creado ✅', 'success');
            editingId = null;
        }
    } catch (error) {
        showMessage('Error guardando producto ❌', 'error');
    }
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('name').value = product.name;
        document.getElementById('description').value = product.description || '';
        document.getElementById('quantity').value = product.quantity;
        document.getElementById('price').value = product.price;
        document.getElementById('category').value = product.category || '';
        editingId = id;
        document.getElementById('name').focus();
        showMessage('Editando producto...', 'info');
    }
}

async function deleteProduct(id) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        try {
            const response = await fetch(`${API_BASE}/products/${id}`, { 
                method: 'DELETE' 
            });
            if (response.ok) {
                loadProducts();
                showMessage('Producto eliminado ✅', 'success');
            }
        } catch (error) {
            showMessage('Error eliminando producto ❌', 'error');
        }
    }
}

function filterProducts() {
    const term = searchInput.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term))
    );
    renderProducts(filtered);
}

async function showLowStock() {
    try {
        const response = await fetch(`${API_BASE}/low-stock`);
        const lowStock = await response.json();
        renderProducts(lowStock);
        lowStockBtn.textContent = `⚠️ ${lowStock.length} productos en stock bajo`;
        lowStockBtn.style.background = lowStock.length > 0 ? '#ff6b6b' : '#28a745';
    } catch (error) {
        showMessage('Error cargando stock bajo ❌', 'error');
    }
}

function updateLowStockButton() {
    const lowStockCount = products.filter(p => p.quantity <= 5).length;
    lowStockBtn.textContent = `⚠️ ${lowStockCount} en stock bajo`;
    lowStockBtn.style.background = lowStockCount > 0 ? '#ffc107' : '#28a745';
}

function renderProducts(productsList) {
    if (productsList.length === 0) {
        productsTable.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 4em; margin-bottom: 20px;">📦</div>
                <h3>No se encontraron productos</h3>
                <p>Agrega tu primer producto usando el formulario superior</p>
            </div>
        `;
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    productsList.forEach(product => {
        const lowStock = product.quantity <= 5;
        html += `
            <tr ${lowStock ? 'style="background: #fff3cd;"' : ''}>
                <td><strong>${product.name}</strong></td>
                <td>${product.description || '-'}</td>
                <td>
                    <span ${lowStock ? 'style="color: #dc3545; font-weight: bold;"' : ''}>
                        ${product.quantity}
                    </span>
                </td>
                <td>$${product.price.toLocaleString('es-CL')}</td>
                <td>
                    <span class="category-badge">${product.category || 'Sin categoría'}</span>
                </td>
                <td>${new Date(product.created_at).toLocaleDateString('es-CL')}</td>
                <td>
                    <button onclick="editProduct(${product.id})" class="btn btn-edit" title="Editar">
                        ✏️ Editar
                    </button>
                    <button onclick="deleteProduct(${product.id})" class="btn btn-delete" title="Eliminar">
                        🗑️ Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    productsTable.innerHTML = html;
}

function resetForm() {
    productForm.reset();
    editingId = null;
    document.querySelector('.form-section h2').textContent = '➕ Nuevo Producto';
}

function showMessage(message, type = 'info') {
    // Crear mensaje temporal
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #28a745;' : 
          type === 'error' ? 'background: #dc3545;' : 
          'background: #17a2b8;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Estilos CSS adicionales para mensajes (agregar al style.css)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .category-badge {
        background: #4facfe;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);