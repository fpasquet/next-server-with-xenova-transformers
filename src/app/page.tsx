export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-12">
            <h1 className="text-5xl font-bold mb-2 text-center">Transformers.js</h1>
            <h2 className="text-2xl mb-4 text-center">Next.js template (server-side)</h2>
            <ul>
                <li><a href="/classify" className="text-black hover:text-gray-700 underline hover:underline-offset-2">Example with classify</a></li>
                <li><a href="/embedding" className="text-black hover:text-gray-700 underline hover:underline-offset-2">Example with embedding</a></li>
            </ul>
        </main>
    );
}
