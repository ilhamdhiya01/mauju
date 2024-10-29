import * as Yup from 'yup';

const AddProductForm = Yup.object().shape({
  title: Yup.string().required('Product name is required'),
  price: Yup.number().required('Product price is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
});

export default AddProductForm;
