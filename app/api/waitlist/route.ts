import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, WaitlistEntry } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingEntry, error: checkError } = await supabaseAdmin
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing email:', checkError)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    if (existingEntry) {
      return NextResponse.json(
        { error: 'Email already registered for waitlist' },
        { status: 409 }
      )
    }

    // Insert new waitlist entry
    const waitlistEntry: Omit<WaitlistEntry, 'id' | 'created_at'> = {
      email: email.toLowerCase()
    }

    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert([waitlistEntry])
      .select()
      .single()

    if (error) {
      console.error('Error inserting waitlist entry:', error)
      return NextResponse.json(
        { error: 'Failed to register for waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully registered for waitlist', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}