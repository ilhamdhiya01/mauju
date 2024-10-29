import * as Yup from 'yup';

const UpdateProductForm = Yup.object().shape({
  title: Yup.string().required('Product name is required'),
  price: Yup.string().required('Product price is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
});

export default UpdateProductForm;
