<template>
    <div class="filter-container">
  
      <!-- Sidebar for Sections and Categories -->
      <aside class="filter-sidebar">
        <!-- Section List -->
        <div class="filter-section">
          <h2>Sections</h2>
          <ul>
            <li 
              v-for="section in sections" 
              :key="section.name"
              :class="{ active: section.name === selectedSection }"
            >
              <a href="#" @click.prevent="selectSection(section.name)">
                {{ section.name }}
              </a>
            </li>
          </ul>
        </div>
  
        <!-- Category List -->
        <div v-if="selectedSection" class="filter-category">
          <h2>{{ selectedSection }} Categories</h2>
          <ul>
            <li 
              v-for="category in filteredCategories" 
              :key="category.name"
              :class="{ active: category.name === selectedCategory?.name }"
            >
              <a href="#" @click.prevent="selectCategory(category)">
                {{ category.name }}
              </a>
            </li>
          </ul>
        </div>
      </aside>
  
      <!-- Main Content for Items -->
      <section class="filter-main-content">
        <div v-if="selectedCategory">
          <h2>{{ selectedCategory.name }} Items</h2>
          <ul class="item-list">
            <li v-for="item in selectedCategory.items" :key="item.id">
              <div class="item-card">
                <img :src="item.image" :alt="item.name" class="item-image" />
                <h3>{{ item.name }}</h3>
                <p class="item-price">${{ item.price.toFixed(2) }}</p>
              </div>
            </li>
          </ul>
        </div>
  
        <!-- No Categories Available -->
        <div v-else-if="selectedSection && !filteredCategories.length">
          <p>No categories available for the selected section.</p>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import data from "@/data.json";
  
  export default {
    name: "FilterComponent",
    data() {
      return {
        sections: data.sections,
        selectedSection: "",
        filteredCategories: [],
        selectedCategory: null
      };
    },
    methods: {
      selectSection(sectionName) {
        this.selectedSection = sectionName;
        this.filteredCategories = this.sections.find(
          sec => sec.name === sectionName
        ).categories;
        this.selectedCategory = null; // Reset the selected category when a new section is chosen
      },
      selectCategory(category) {
        this.selectedCategory = category;
      }
    }
  };
  </script>
  
  <style scoped>
  /* General Layout */
  .filter-container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* Sidebar Styles */
  .filter-sidebar {
    width: 250px;
    padding-right: 20px;
    border-right: 2px solid #ddd;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .filter-section, .filter-category {
    margin-bottom: 30px;
  }
  
  .filter-section h2, .filter-category h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #555;
  }
  
  .filter-sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .filter-sidebar li {
    margin: 10px 0;
  }
  
  .filter-sidebar a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 12px;
    display: block;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .filter-sidebar a:hover {
    background-color: #007bff;
    color: #fff;
  }
  
  .filter-sidebar .active a {
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
  }
  
  /* Main Content Styles */
  .filter-main-content {
    flex-grow: 1;
    padding-left: 20px;
  }
  
  .filter-main-content h2 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
  }
  
  .item-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .item-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: calc(33.333% - 10px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    text-align: center;
  }
  
  .item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .item-card h3 {
    font-size: 18px;
    font-weight: 500;
    margin: 10px 0;
    color: #333;
  }
  
  .item-card .item-price {
    font-size: 16px;
    color: #007bff;
    font-weight: bold;
  }
  
  .item-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  </style>
  