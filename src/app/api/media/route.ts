import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function GET() {
  try {
    // Ανάκτηση των εικόνων από το Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.api.resources(
        {
          type: 'upload',
          prefix: 'aion-cms',
          max_results: 500,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    return NextResponse.json((result as any).resources);
  } catch (error) {
    console.error('Error fetching from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Error fetching images' },
      { status: 500 }
    );
  }
}