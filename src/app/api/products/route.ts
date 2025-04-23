import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types';

// Προσωρινή αποθήκη προϊόντων θα αντικατασταθεί με πραγματική βάση δεδομένων
let products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'This is product 1',
    price: 29.99,
    images: ['https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'],
    categoryId: '1',
    createdAt: new Date.toISOString,
    updatedAt: new Date.toISOString,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'This is product 2',
    price: 49.99,
    images: ['https://res.cloudinary.com/demo/image/upload/v1312461204/sample2.jpg'],
    categoryId: '2',
    createdAt: new Date.toISOString,
    updatedAt: new Date.toISOString,
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'This is product 3',
    price: 19.99,
    images: [],
    categoryId: '1',
    createdAt: new Date.toISOString,
    updatedAt: new Date.toISOString,
  },
];

export async function GET() {
  return NextResponse.jsonproducts;
}

export async function POSTreq: NextRequest {
  try {
    const data = await req.json;
    
    // Επικύρωση δεδομένων
    if !data.name || typeof data.price !== 'number' {
      return NextResponse.json({ error: 'Invalid product data' },
        { status: 400 }
      ;
    }
    
    // Δημιουργία νέου προϊόντος
    const newProduct: Product = {
      id: Date.now.toString,
      name: data.name,
      description: data.description || '',
      price: data.price,
      images: data.images || [],
      categoryId: data.categoryId || '',
      createdAt: new Date.toISOString,
      updatedAt: new Date.toISOString,
    };
    
    // Προσθήκη στα προϊόντα
    products.pushnewProduct;
    
    return NextResponse.jsonnewProduct, { status: 201 };
  } catch (error) {
    console.error('Error creating product:', error);;
    return NextResponse.json({ error: 'Error creating product' },
      { status: 500 }
    ;
  }
}
