import { NextRequest, NextResponse } from 'next/server';

import EmbeddingPipelineSingleton from './pipeline';

export async function GET(request: NextRequest) {
    const text = request.nextUrl.searchParams.get('text');

    if (!text || text.trim().length === 0) {
        return NextResponse.json(
            { error: 'Missing or empty "text" parameter' },
            { status: 400 },
        );
    }

    try {
        const extractor = await EmbeddingPipelineSingleton.getInstance();
        const output = await extractor(text, { pooling: 'mean', normalize: true });

        return NextResponse.json({
            model: 'Xenova/all-MiniLM-L6-v2',
            output
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: `Embedding generation failed: ${message}` }, { status: 500 },);
    }
}
