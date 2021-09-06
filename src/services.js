import axios from 'axios';


const getCategories = () => axios.get(
  'https://612345a1d446280017054a88.mockapi.io/interview/category'
).then(response => response.data);

const getProduct = (id) => axios.get(
  `https://612345a1d446280017054a88.mockapi.io/interview/category/${id}`,

).then(response => {
  console.log(response);
  return response.data;
});


export {
  getCategories,
  getProduct,
}