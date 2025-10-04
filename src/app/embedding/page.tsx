'use client';

import {ComponentProps, useState} from 'react';

export default function EmbeddingPage() {
    const [result, setResult] = useState<object | null>(null);
    const [ready, setReady] = useState<boolean | null>(null);
    const [text, setText] = useState<string>('');

    const onSubmit: ComponentProps<'form'>['onSubmit'] = async (event): Promise<void> => {
        event.preventDefault();
        if (!text) return;
        if (ready === null) setReady(false);

        const response = await fetch(`/api/embedding?text=${encodeURIComponent(text)}`);
        if (!ready) setReady(true);

        const json = (await response.json()) as object;
        setResult(json);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-12">
            <h1 className="text-5xl font-bold mb-2 text-center">
                Transformers.js with embeddings
            </h1>
            <h2 className="text-2xl mb-4 text-center">
                Next.js template (server-side)
            </h2>

            <form onSubmit={onSubmit} className="flex flex-col items-center w-full max-w-xs">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mb-4 bg-white"
                    placeholder="Enter text here"
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded"
                >
                    Submit
                </button>
            </form>

            {ready !== null && (
                <pre className="bg-gray-100 p-2 rounded mt-4 w-full max-w-xl overflow-auto">
          {!ready || !result ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
            )}
        </main>
    );
}
