import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, Token } from '@/lib/supabase'
import { validateApiKey, createUnauthorizedResponse } from '@/lib/auth'

// GET /api/tokens/[id] - Get a specific token by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Validate API key
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse()
  }

  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Token ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('token')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Token not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching token:', error)
      return NextResponse.json(
        { error: 'Failed to fetch token' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/tokens/[id] - Update a specific token
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Validate API key
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse()
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { name, ticker, image_url, amount, creator_address } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Token ID is required' },
        { status: 400 }
      )
    }

    // Check if token exists
    const { data: existingToken, error: fetchError } = await supabaseAdmin
      .from('token')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Token not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching token:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch token' },
        { status: 500 }
      )
    }

    // Build update object with only provided fields
    const updateData: Partial<Token> = {}
    
    if (name !== undefined) updateData.name = name
    if (ticker !== undefined) {
      // Validate ticker format if provided
      const tickerRegex = /^[A-Z0-9]{1,16}$/
      if (!tickerRegex.test(ticker)) {
        return NextResponse.json(
          { error: 'Ticker must be 1-16 characters, alphanumeric uppercase only' },
          { status: 400 }
        )
      }
      updateData.ticker = ticker
    }
    if (image_url !== undefined) updateData.image_url = image_url
    if (amount !== undefined) {
      if (isNaN(amount) || amount < 0) {
        return NextResponse.json(
          { error: 'Amount must be a non-negative number' },
          { status: 400 }
        )
      }
      updateData.amount = amount
    }
    if (creator_address !== undefined) updateData.creator_address = creator_address

    // Check for unique constraints if name or ticker are being updated
    if (name && name !== existingToken.name) {
      const { data: existingName, error: nameCheckError } = await supabaseAdmin
        .from('token')
        .select('name')
        .eq('name', name)
        .neq('id', id)
        .single()

      if (nameCheckError && nameCheckError.code !== 'PGRST116') {
        console.error('Error checking existing name:', nameCheckError)
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        )
      }

      if (existingName) {
        return NextResponse.json(
          { error: 'Token name already exists' },
          { status: 409 }
        )
      }
    }

    if (ticker && ticker !== existingToken.ticker) {
      const { data: existingTicker, error: tickerCheckError } = await supabaseAdmin
        .from('token')
        .select('ticker')
        .eq('ticker', ticker)
        .neq('id', id)
        .single()

      if (tickerCheckError && tickerCheckError.code !== 'PGRST116') {
        console.error('Error checking existing ticker:', tickerCheckError)
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        )
      }

      if (existingTicker) {
        return NextResponse.json(
          { error: 'Token ticker already exists' },
          { status: 409 }
        )
      }
    }

    // Update the token
    const { data, error } = await supabaseAdmin
      .from('token')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating token:', error)
      return NextResponse.json(
        { error: 'Failed to update token' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Token updated successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/tokens/[id] - Delete a specific token (only by owner)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Validate API key
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse()
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { creator_address } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Token ID is required' },
        { status: 400 }
      )
    }

    if (!creator_address) {
      return NextResponse.json(
        { error: 'Creator address is required for deletion' },
        { status: 400 }
      )
    }

    // Check if token exists and get owner info
    const { data: existingToken, error: fetchError } = await supabaseAdmin
      .from('token')
      .select('id, creator_address')
      .eq('id', id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Token not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching token:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch token' },
        { status: 500 }
      )
    }

    // Verify ownership
    if (existingToken.creator_address !== creator_address) {
      return NextResponse.json(
        { error: 'Unauthorized: Only the token creator can delete this token' },
        { status: 403 }
      )
    }

    // Delete the token
    const { error } = await supabaseAdmin
      .from('token')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting token:', error)
      return NextResponse.json(
        { error: 'Failed to delete token' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Token deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}