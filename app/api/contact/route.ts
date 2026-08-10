import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été enregistré avec succès. Notre équipe vous répondra rapidement.',
        data: validatedData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || 'Données du formulaire invalides' },
      { status: 400 }
    );
  }
}
