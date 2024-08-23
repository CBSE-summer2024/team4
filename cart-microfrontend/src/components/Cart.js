class CartComponent extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      // Initialize state
      this.products = [
          { id: 1, name: 'Men Sport Shoe MO F50', price: 22.00, quantity: 1, available: true },
          { id: 2, name: 'حذاء كاجيوال سبورت للشباب', price: 33.00, quantity: 1, available: true },
          { id: 3, name: 'سماعة أذن ويرليس Kebido', price: 20.99, quantity: 1, available: true },
      ];
      this.searchTerm = '';

      this.render();
  }

  connectedCallback() {
      this.renderProducts();
      this.shadowRoot.querySelector('#search-bar').addEventListener('input', (e) => this.handleSearch(e));
  }

  handleSearch(event) {
      this.searchTerm = event.target.value.toLowerCase();
      this.renderProducts();
  }

  handleRemove(id) {
      const index = this.products.findIndex(product => product.id === id);
      if (index !== -1) {
          this.products.splice(index, 1);
          this.renderProducts();
      }
  }

  handleQuantityChange(id, quantity) {
      const product = this.products.find(product => product.id === id);
      if (product) {
          product.quantity = Math.max(1, parseInt(quantity, 10) || 1);
          this.renderProducts();
      }
  }

  renderProducts() {
      const productList = this.shadowRoot.getElementById('product-list');
      productList.innerHTML = '';

      const filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm)
      );

      const grandTotal = filteredProducts.reduce((total, product) =>
          total + (product.price * product.quantity), 0
      );

      filteredProducts.forEach(product => {
          const row = document.createElement('tr');
          row.className = 'product-row';

          row.innerHTML = `
              <td class="product-cell">${product.name}</td>
              <td class="product-cell">${product.available ? 'In Stock' : 'Out of Stock'}</td>
              <td class="product-cell">$${product.price.toFixed(2)}</td>
              <td class="product-cell">
                  <input type="number" min="1" value="${product.quantity}" class="quantity-input" data-id="${product.id}">
              </td>
              <td class="product-cell">$${(product.price * product.quantity).toFixed(2)}</td>
              <td class="product-cell">
                  <button class="remove-button" data-id="${product.id}">Remove</button>
              </td>
          `;

          productList.appendChild(row);
      });

      this.shadowRoot.getElementById('grand-total').textContent = `$${grandTotal.toFixed(2)}`;

      this.shadowRoot.querySelectorAll('.remove-button').forEach(button => {
          button.addEventListener('click', event => {
              this.handleRemove(parseInt(event.target.getAttribute('data-id')));
          });
      });

      this.shadowRoot.querySelectorAll('.quantity-input').forEach(input => {
          input.addEventListener('input', event => {
              this.handleQuantityChange(parseInt(event.target.getAttribute('data-id')), event.target.value);
          });
      });
  }

  render() {
      this.shadowRoot.innerHTML = `
          <style>
              /* Your CSS here */
          </style>
          <div class="cart-container">
              <header class="cart-header">Cart Items</header>
              <input type="text" id="search-bar" placeholder="Search for products..." class="search-bar">
              <table class="product-table">
                  <thead class="product-table-header">
                      <tr>
                          <th class="header-item">Product</th>
                          <th class="header-item">Availability</th>
                          <th class="header-item">Unit Price</th>
                          <th class="header-item">Quantity</th>
                          <th class="header-item">Total</th>
                          <th class="header-item">Action</th>
                      </tr>
                  </thead>
                  <tbody id="product-list"></tbody>
              </table>
              <div class="grand-total">
                  <span>Total:</span>
                  <span id="grand-total">$0.00</span>
              </div>
          </div>
      `;
  }
}

customElements.define('cart-component', CartComponent);
