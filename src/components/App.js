import React, { useEffect, useState } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import Product from './ProductList';
import './App.css';
import { getCategories } from '../services';

const buildTree = categories => {
  const map = categories.reduce((acc, category) => {
    acc[category.id] = {
      ...category,
      children: [],
    };
    //if it has parent
    if (category.parent_id) {
      acc[category.parent_id].children.push({
        ...category,
        children: [],
      });
    }
    return acc;
  }, {});

  const tree = [];

  Object.keys(map).forEach((key) => {
    const current = map[key];
    if (!current.parent_id) {
      tree.push({
        ...current,
        children: []
      });
    } else {
      const parent = tree.find(cat => cat.id == current.parent_id);
      console.log(parent, tree);
      if (parent) {
        parent.children.push(current);
      }
    }
  });

  return tree;
}

function App() {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setcategories(buildTree(data)))
  }, []);
  // });

  return (
    <>
      <Header />
      <div className="container">
        <SideMenu className="flex-item-left" categories={categories} />
        <Product />
      </div>
    </>
  );
}

export default App;
