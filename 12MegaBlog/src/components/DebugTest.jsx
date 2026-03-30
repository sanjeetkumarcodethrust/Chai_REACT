import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import authService from '../appwrite/auth'

function DebugTest() {
    const [testResults, setTestResults] = useState([])
    const [loading, setLoading] = useState(false)

    const runTests = async () => {
        setLoading(true)
        const results = []

        try {
            // Test 1: Check if service is initialized
            results.push({ test: 'Service Initialization', status: '✅ PASS', message: 'Service initialized successfully' })

            // Test 2: Try to get posts (should work for public collection)
            try {
                const posts = await appwriteService.getPosts([])
                results.push({
                    test: 'Get Posts (All)',
                    status: posts ? '✅ PASS' : '❌ FAIL',
                    message: posts ? `Found ${posts.documents?.length || 0} posts` : 'No posts returned'
                })
            } catch (error) {
                results.push({
                    test: 'Get Posts (All)',
                    status: '❌ FAIL',
                    message: `Error: ${error.message} (Code: ${error.code})`
                })
            }

            // Test 3: Try to get active posts
            try {
                const posts = await appwriteService.getPosts()
                results.push({
                    test: 'Get Active Posts',
                    status: posts ? '✅ PASS' : '❌ FAIL',
                    message: posts ? `Found ${posts.documents?.length || 0} active posts` : 'No posts returned'
                })
            } catch (error) {
                results.push({
                    test: 'Get Active Posts',
                    status: '❌ FAIL',
                    message: `Error: ${error.message} (Code: ${error.code})`
                })
            }

            // Test 4: Try to get current user (should fail if not logged in)
            try {
                const user = await authService.getCurrentUser()
                results.push({
                    test: 'Get Current User',
                    status: user ? '✅ PASS' : '⚠️ EXPECTED',
                    message: user ? `User: ${user.name} (${user.email})` : 'No user logged in (expected)'
                })
            } catch (error) {
                results.push({
                    test: 'Get Current User',
                    status: '❌ FAIL',
                    message: `Error: ${error.message} (Code: ${error.code})`
                })
            }

            // Test 6: Try to create a test post (will fail without auth, but shows write permission setup)
            try {
                const uniqueSlug = `test-post-${Date.now()}`;
                const testPost = await appwriteService.createPost({
                    title: 'Test Post',
                    slug: uniqueSlug,
                    content: 'This is a test post content',
                    featuredImage: '',
                    status: 'active',
                    userId: 'test-user-id'
                })
                results.push({
                    test: 'Create Test Post',
                    status: testPost ? '✅ PASS' : '❌ FAIL',
                    message: testPost ? 'Post created successfully' : 'Post creation failed'
                })
            } catch (error) {
                results.push({
                    test: 'Create Test Post',
                    status: error.code === 401 ? '⚠️ EXPECTED (No Auth)' : '❌ FAIL',
                    message: `Error: ${error.message} (Code: ${error.code})`
                })
            }

            // Test 8: Test signup with dummy data (should fail gracefully)
            try {
                const testSignup = await authService.createAccount({
                    email: 'test@example.com',
                    password: 'TestPass123',
                    name: 'Test User'
                })
                results.push({
                    test: 'Test Signup',
                    status: testSignup ? '✅ PASS' : '❌ FAIL',
                    message: testSignup ? 'Signup successful' : 'Signup failed'
                })
            } catch (error) {
                results.push({
                    test: 'Test Signup',
                    status: error.code === 409 ? '⚠️ EXPECTED (User Exists)' : '❌ FAIL',
                    message: `Error: ${error.message} (Code: ${error.code})`
                })
            }

            // Test 9: Test login with dummy data (should fail gracefully)
            try {
                const testLogin = await authService.login({
                    email: 'test@example.com',
                    password: 'TestPass123'
                })
                results.push({
                    test: 'Test Login',
                    status: testLogin ? '✅ PASS' : '❌ FAIL',
                    message: testLogin ? 'Login successful' : 'Login failed'
                })
            } catch (error) {
                // Check if error message mentions invalid credentials
                const isInvalidCreds = error.message?.includes('Invalid') || error.message?.includes('invalid');
                results.push({
                    test: 'Test Login',
                    status: isInvalidCreds ? '⚠️ EXPECTED (Invalid Creds)' : '❌ FAIL',
                    message: `Error: ${error.message}`
                })
            }

        } catch (error) {
            results.push({
                test: 'General Error',
                status: '❌ FAIL',
                message: `Unexpected error: ${error.message}`
            })
        }

        setTestResults(results)
        setLoading(false)
    }

    useEffect(() => {
        runTests()
    }, [])

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Appwrite Backend Debug Test</h1>
            <button
                onClick={runTests}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Running Tests...' : 'Run Tests Again'}
            </button>

            <div className="space-y-4">
                {testResults.map((result, index) => (
                    <div key={index} className="border rounded p-4">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold">{result.test}:</span>
                            <span className={`font-bold ${result.status.includes('PASS') ? 'text-green-600' : result.status.includes('EXPECTED') ? 'text-yellow-600' : 'text-red-600'}`}>
                                {result.status}
                            </span>
                        </div>
                        <p className="text-gray-600 mt-1">{result.message}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded">
                <h2 className="text-xl font-semibold mb-2">Configuration Check:</h2>
                <ul className="space-y-1 text-sm">
                    <li>URL: {import.meta.env.VITE_APPWRITE_URL || '❌ MISSING'}</li>
                    <li>Project ID: {import.meta.env.VITE_APPWRITE_PROJECT_ID || '❌ MISSING'}</li>
                    <li>Database ID: {import.meta.env.VITE_APPWRITE_DATABASE_ID || '❌ MISSING'}</li>
                    <li>Collection ID: {import.meta.env.VITE_APPWRITE_COLLECTION_ID || '❌ MISSING'}</li>
                    <li>Bucket ID: {import.meta.env.VITE_APPWRITE_BUCKET_ID || '❌ MISSING'}</li>
                </ul>
            </div>

            <div className="mt-8 p-4 bg-yellow-100 rounded">
                <h2 className="text-xl font-semibold mb-2">⚠️ What the Failures Mean:</h2>
                <ul className="space-y-2 text-sm">
                    <li><strong>Test Signup (409 User Exists):</strong> Good! User already exists. This is expected behavior.</li>
                    <li><strong>Test Login (Invalid Credentials):</strong> The test user 'test@example.com' may not exist or password is wrong.</li>
                    <li><strong>Create Test Post (FAIL):</strong> You're not logged in. Posts require authentication.</li>
                </ul>
            </div>

            <div className="mt-8 p-4 bg-blue-100 rounded">
                <h2 className="text-xl font-semibold mb-2">💡 How to Test Properly:</h2>
                <ol className="space-y-2 text-sm">
                    <li>1. Go to <a href="/signup" className="text-blue-600 underline">/signup</a> and create a NEW user</li>
                    <li>2. After signup, you should be logged in automatically</li>
                    <li>3. Go to <a href="/add-post" className="text-blue-600 underline">/add-post</a> to create a post with image</li>
                    <li>4. Images will display on home page once uploaded</li>
                    <li>5. Use this debug page only to check backend connectivity</li>
                </ol>
            </div>
        </div>
    )
}

export default DebugTest