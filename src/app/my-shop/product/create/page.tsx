// import Form from '@/app/ui/invoices/create-form';
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import { AddProduct } from '@/app/ui/my-shop/forms'
import { GetCategories } from '@/app/lib/mongodb';
 
export const metadata: Metadata = {
  title: 'Add a product',
};
 
export default async function Page() {
  const categories = await GetCategories();
 
  return (
    <>
      <h1> Add Product </h1>  
      {/* <Form customers={customers} /> */}
      <AddProduct categories={categories}></AddProduct>
    </>
  );
}