import { NextRequest, NextResponse } from 'next/server';
import { Category } from '@/types';

// Προσωρινή αποθήκη κατηγοριών — θα αντικατασταθεί με πραγματική βάση δεδομένων
let categories: Category[] = [
  {
    id: '1',
    name: 'Category A',
    description: 'This is category A',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Category B',
    description: 'This is category B',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Category C',
    description: 'This is category C',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ------------------------
// GET
// ------------------------
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = categories.find((c) => c.id === params.id);

  if (!category) {
    return NextResponse.json(
      { error: 'Category not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(category);
}

// ------------------------
// PUT
// ------------------------
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const index = categories.findIndex((c) => c.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    categories[index] = {
      ...categories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(categories[index]);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Error updating category' },
      { status: 500 }
    );
  }
}

// ------------------------
// DELETE
// ------------------------
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = categories.findIndex((c) => c.id === params.id);

  if (index === -1) {
    return NextResponse.json(
      { error: 'Category not found' },
      { status: 404 }
    );
  }

  categories.splice(index, 1);

  return NextResponse.json({ success: true });
}