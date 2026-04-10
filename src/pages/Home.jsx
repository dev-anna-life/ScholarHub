/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiSearch, FiBell, FiHeart, FiMessageCircle, FiShare2, FiPlus, FiTrendingUp, FiBookmark } from "react-icons/fi"
import { createPost } from '../api/auth'

const categories = ['All', 'Sciences', 'Mathematics', 'Technology', 'Law', 'Medicine', 'Arts & Lit', 'Commerce', 'Entertainment', 'Campus Gist']

const mockPosts = [
    {
        id: 1,
        author: 'Amara Okafor',
        avatar: 'AO',
        school: 'University of Lagos',
        level: 'University',
        category: 'Technology',
        title: 'How I built my first React app in 3 days',
        content: 'Starting out in web development felt overwhelming but breaking it down into small steps made all the difference. Here is exactly how I did it...',
        likes: 142,
        comments: 38,
        time: '2h ago',
        trending: true,
        saved: false,
    },
    {
        id: 2,
        author: 'Chidi Eze',
        avatar: 'CE',
        school: 'OAU Ile-Ife',
        level: 'University',
        category: 'Sciences',
        title: 'Complete notes on Organic Chemistry - JAMB & WAEC',
        content: 'I have compiled everything you need to know about Organic Chemistry for both JAMB and WAEC. Hydrocarbons, functional groups, reactions and more...',
        likes: 289,
        comments: 61,
        time: '4h ago',
        trending: true,
        saved: false,
    },
    {
        id: 3,
        author: 'Fatima Bello',
        avatar: 'FB',
        school: 'ABU Zaria',
        level: 'Postgrad',
        category: 'Law',
        title: 'Understanding Constitutional Law in Nigeria - simplified',
        content: 'Many law students struggle with Constitutional Law because of how abstract it feels. Let me break it down in the simplest way possible...',
        likes: 97,
        comments: 24,
        time: '6h ago',
        trending: false,
        saved: false,
    },
    {
        id: 4,
        author: 'Ngozi Adeyemi',
        avatar: 'NA',
        school: 'Covenant University',
        level: 'University',
        category: 'Campus Gist',
        title: 'ASUU strike update - what students need to know',
        content: 'Here is the latest on the ongoing negotiations and what it means for students across Nigerian universities...',
        likes: 412,
        comments: 103,
        time: '8h ago',
        trending: true,
        saved: false,
    },
    {
        id: 5,
        author: 'Emeka Nwosu',
        avatar: 'EN',
        school: 'UNILAG',
        level: 'University',
        category: 'Mathematics',
        title: 'Step by step solutions to 2024 WAEC Maths past questions',
        content: 'I went through every single question from the 2024 WAEC Mathematics paper and solved them with full workings. Download link inside...',
        likes: 334,
        comments: 77,
        time: '12h ago',
        trending: false,
        saved: false,
    },
]

function Home() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [posts, setPosts] = useState(mockPosts)
    const [searchQuery, setSearchQuery] = useState('')
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Sciences' })

    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const toggleLike = (id) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p))
    }

    const toggleSave = (id) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p))
    }

    const [postLoading, setPostLoading] = useState(false)
    const [postError, setPostError] = useState('')
    const [postSuccess, setPostSuccess] = useState(false)

    const handleCreatePost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim()) {
            setPostError('Title and content are required')
            return
        }
        setPostLoading(true)
        setPostError('')
        try {
            await createPost(newPost)
            setPostSuccess(true)
            setNewPost({ title: '', content: '', category: 'Sciences' })
            setTimeout(() => {
                setShowCreatePost(false)
                setPostSuccess(false)
            }, 2000)
        } catch (err) {
            setPostError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setPostLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-light md:pl-56">

            <div className="sticky top-0 z-40 bg-light/95 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                <div className="max-w-5xl mx-auto flex items-center gap-3">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition"
                        />
                    </div>
                    <button className="relative p-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary transition">
                        <FiBell size={18} className="text-dark" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full"></span>
                    </button>
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white text-xs font-bold">
                        {user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SH'}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6">

                <div className="flex-1 min-w-0">

                    <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-dark rounded-2xl p-4 mb-6 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FiTrendingUp size={20} className="text-accent" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">Trending today</p>
                            <p className="text-gray-400 text-xs">ASUU strike update is the most discussed post right now</p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-4">
                        <AnimatePresence>
                            {filteredPosts.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16 text-gray-400"
                                >
                                    <p className="text-lg font-semibold mb-1">No posts found</p>
                                    <p className="text-sm">Try a different category or search term</p>
                                </motion.div>
                            ) : (
                                filteredPosts.map((post, i) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                                    >

                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                                                {post.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-dark text-sm">{post.author}</p>
                                                <p className="text-xs text-gray-400 truncate">{post.school} • {post.time}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {post.trending && (
                                                    <span className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                                                        Trending
                                                    </span>
                                                )}
                                                <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-dark text-base mb-2 leading-snug">{post.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.content}</p>

                                        <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                                            <button
                                                onClick={() => toggleLike(post.id)}
                                                className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${post.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                            >
                                                <FiHeart size={16} className={post.liked ? 'fill-current' : ''} />
                                                {post.likes}
                                            </button>
                                            <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors duration-200">
                                                <FiMessageCircle size={16} />
                                                {post.comments}
                                            </button>
                                            <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors duration-200">
                                                <FiShare2 size={16} />
                                                Share
                                            </button>
                                            <button
                                                onClick={() => toggleSave(post.id)}
                                                className={`ml-auto transition-colors duration-200 ${post.saved ? 'text-primary' : 'text-gray-300 hover:text-primary'}`}
                                            >
                                                <FiBookmark size={16} className={post.saved ? 'fill-current' : ''} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="hidden lg:flex flex-col gap-4 w-72 flex-shrink-0">

                    <div className="bg-white rounded-2xl p-4 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
                                {user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SH'}
                            </div>
                            <div>
                                <p className="font-bold text-dark text-sm">{user.name || 'Student'}</p>
                                <p className="text-xs text-gray-400">{user.level || 'ScholarHub'}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-light rounded-xl p-2.5 text-center">
                                <p className="font-extrabold text-primary text-lg">{user.coins || 50}</p>
                                <p className="text-xs text-gray-400">Coins</p>
                            </div>
                            <div className="bg-light rounded-xl p-2.5 text-center">
                                <p className="font-extrabold text-dark text-lg">0</p>
                                <p className="text-xs text-gray-400">Posts</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-gray-100">
                        <h3 className="font-bold text-dark text-sm mb-3">🏆 Top Scholars</h3>
                        <div className="flex flex-col gap-2">
                            {[
                                { rank: '🥇', name: 'Amara Okafor', coins: '2,450' },
                                { rank: '🥈', name: 'Chidi Eze', coins: '2,100' },
                                { rank: '🥉', name: 'Fatima Bello', coins: '1,980' },
                            ].map(s => (
                                <div key={s.name} className="flex items-center gap-2">
                                    <span className="text-base">{s.rank}</span>
                                    <p className="text-xs font-medium text-dark flex-1 truncate">{s.name}</p>
                                    <p className="text-xs font-bold text-primary">{s.coins}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-dark rounded-2xl p-4">
                        <p className="text-white font-bold text-sm mb-1">🔥 Your Streak</p>
                        <p className="text-gray-400 text-xs mb-3">Post daily to keep your streak alive</p>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5, 6, 7].map(d => (
                                <div key={d} className={`flex-1 h-2 rounded-full ${d <= 2 ? 'bg-accent' : 'bg-white/10'}`} />
                            ))}
                        </div>
                        <p className="text-accent text-xs font-semibold mt-2">2 / 7 days</p>
                    </div>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreatePost(true)}
                className="fixed bottom-8 right-8 bg-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 hover:opacity-90 transition z-50"
            >
                <FiPlus size={24} />
            </motion.button>

            <AnimatePresence>
                {showCreatePost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
                        onClick={() => setShowCreatePost(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                            className="bg-white rounded-2xl p-6 w-full max-w-lg"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold text-dark mb-4">Create a Post</h2>

                            <select
                                value={newPost.category}
                                onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-3 focus:outline-none focus:border-primary transition"
                            >
                                {categories.filter(c => c !== 'All').map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="Post title"
                                value={newPost.title}
                                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-3 focus:outline-none focus:border-primary transition"
                            />

                            <textarea
                                placeholder="Share your knowledge, notes, gist or anything valuable..."
                                value={newPost.content}
                                onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                rows={5}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-4 focus:outline-none focus:border-primary transition resize-none"
                            />

                            {postError && <p className="text-red-500 text-sm mb-3">{postError}</p>}
                            {postSuccess && <p className="text-primary text-sm mb-3 text-center font-medium">✅ Post submitted for review!</p>}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCreatePost(false)}
                                    className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-dark hover:border-primary transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreatePost}
                                    disabled={postLoading}
                                    className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
                                >
                                    {postLoading ? 'Submitting...' : postSuccess ? '✅ Submitted!' : 'Submit for Review'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}

export default Home