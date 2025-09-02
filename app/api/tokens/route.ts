import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, Token } from '@/lib/supabase'
import { validateApiKey, createUnauthorizedResponse } from '@/lib/auth'
import { uploadToPinata } from '@/lib/pinata'

// GET /api/tokens - Get all tokens or filter by creator_address
export async function GET(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse()
  }

  try {
    const { searchParams } = new URL(request.url)
    const creatorAddress = searchParams.get('creator_address')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    let query = supabaseAdmin
      .from('token')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by creator address if provided
    if (creatorAddress) {
      query = query.eq('creator_address', creatorAddress)
    }

    // Apply pagination
    if (limit) {
      const limitNum = parseInt(limit)
      if (limitNum > 0 && limitNum <= 100) {
        query = query.limit(limitNum)
      }
    }

    if (offset) {
      const offsetNum = parseInt(offset)
      if (offsetNum >= 0) {
        query = query.range(offsetNum, offsetNum + (parseInt(limit || '10') - 1))
      }
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching tokens:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tokens' },
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

// POST /api/tokens - Create a new token
export async function POST(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return createUnauthorizedResponse()
  }

  try {
    const body = await request.json()
    const { name, ticker, image_url, amount, creator_address, image_file } = body

    // Validate required fields
    if (!name || !ticker || !creator_address) {
      return NextResponse.json(
        { error: 'Missing required fields: name, ticker, creator_address' },
        { status: 400 }
      )
    }

    // Validate ticker format (alphanumeric, max 16 chars)
    const tickerRegex = /^[A-Z0-9]{1,16}$/
    if (!tickerRegex.test(ticker)) {
      return NextResponse.json(
        { error: 'Ticker must be 1-16 characters, alphanumeric uppercase only' },
        { status: 400 }
      )
    }

    // Validate amount if provided
    if (amount !== undefined && (isNaN(amount) || amount < 0)) {
      return NextResponse.json(
        { error: 'Amount must be a non-negative number' },
        { status: 400 }
      )
    }

    // Check if name already exists
    const { data: existingName, error: nameCheckError } = await supabaseAdmin
      .from('token')
      .select('name')
      .eq('name', name)
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

    // Check if ticker already exists
    const { data: existingTicker, error: tickerCheckError } = await supabaseAdmin
      .from('token')
      .select('ticker')
      .eq('ticker', ticker)
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

    // Handle image upload to Pinata if image_file is provided
    let finalImageUrl = image_url || null
    
    if (image_file) {
      try {
        // Convert base64 or file data to buffer
        let imageBuffer: Buffer
        if (typeof image_file === 'string') {
          // Handle base64 string
          const base64Data = image_file.replace(/^data:image\/[a-z]+;base64,/, '')
          imageBuffer = Buffer.from(base64Data, 'base64')
        } else {
          // Handle file buffer
          imageBuffer = Buffer.from(image_file)
        }

        // Upload image to Pinata
        const imageResult = await uploadToPinata(imageBuffer, {
          name: `${ticker}-${name}-image`,
          keyvalues: {
            tokenName: name,
            tokenTicker: ticker,
            creatorAddress: creator_address
          }
        })

        finalImageUrl = imageResult.url
      } catch (imageError) {
        console.error('Error uploading image to Pinata:', imageError)
        return NextResponse.json(
          { error: 'Failed to upload image to IPFS' },
          { status: 500 }
        )
      }
    }

    // Create new token
    const tokenData: Omit<Token, 'id' | 'created_at'> = {
      name,
      ticker,
      image_url: finalImageUrl,
      amount: amount || 0,
      creator_address
    }

    const { data, error } = await supabaseAdmin
      .from('token')
      .insert([tokenData])
      .select()
      .single()

    if (error) {
      console.error('Error creating token:', error)
      return NextResponse.json(
        { error: 'Failed to create token' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Token created successfully', 
        data
      },
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