import { LitElement, html, css } from 'lit';

export class SearchBar extends LitElement {
  static properties = {
    query: { type: String },
    products: { type: Array },
    filteredProducts: { type: Array },
  };

  constructor() {
    super();
    this.query = '';
    this.products = [];
    this.filteredProducts = [];
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      font-family: 'Arial', sans-serif;
      background-color: #f7f8fa;
      color: #333;
    }

    .search-container {
      width: 100%;
      max-width: 600px;
      margin-bottom: 20px;
    }

    input[type="text"] {
      width: 100%;
      padding: 15px;
      border: 2px solid #ccc;
      border-radius: 30px;
      font-size: 18px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    input[type="text"]:focus {
      border-color: #007bff;
      box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
      outline: none;
    }

    ul {
      width: 100%;
      max-width: 600px;
      list-style: none;
      padding: 0;
      margin: 0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      background-color: #fff;
    }

    li {
      padding: 15px;
      border-bottom: 1px solid #eee;
      transition: background-color 0.3s ease;
    }

    li:last-child {
      border-bottom: none;
    }

    li:hover {
      background-color: #f0f8ff;
    }

    li {
      font-size: 16px;
      cursor: pointer;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      this.products = data;
      this.filteredProducts = data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  updateQuery(event) {
    this.query = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.query)
    );
  }

  render() {
    return html`
      <div class="search-container">
        <input 
          type="text" 
          placeholder="Search products..." 
          @input="${this.updateQuery}" 
        />
      </div>
      <ul>
        ${this.filteredProducts.map(
          (product) => html`<li>${product.title}</li>`
        )}
      </ul>
    `;
  }
}

customElements.define('search-bar', SearchBar);
