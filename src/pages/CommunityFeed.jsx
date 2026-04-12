/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { FiArrowLeft, FiHeart, FiMessageCircle, FiShare2, FiBookmark, FiPlus, FiUsers, FiTrendingUp, FiStar, FiBookOpen, FiZap, FiAward } from "react-icons/fi"
import { createPost } from "../api/auth"

const communityData = {
    jss: {
        name: 'JSS Community',
        level: 'JSS',
        description: 'Junior secondary students sharing knowledge and growing together',
        color: 'from-[#1F2A1F] to-[#2d4a2d]',
        accentColor: '#008751',
        lightColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-[#1F2A1F]',
        bgAccent: 'bg-emerald-500',
        members: '12,400',
        icon: FiBookOpen,
        pinned: 'Welcome to the JSS Community! Share your notes, ask questions and help each other grow. ',
        topContributors: [
            { name: 'Emeka O.', coins: 890, avatar: 'EO' },
            { name: 'Blessing A.', coins: 720, avatar: 'BA' },
            { name: 'Tunde M.', coins: 610, avatar: 'TM' },
        ],
        categories: ['All', 'Basic Science', 'Mathematics', 'English', 'Social Studies', 'CRS/IRS', 'Gist'],
    },
    sss: {
        name: 'SSS Community',
        level: 'SSS',
        description: 'Senior secondary students conquering WAEC, NECO and JAMB together',
        color: 'from-[#008751] to-[#00a86b]',
        accentColor: '#008751',
        lightColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-800',
        bgAccent: 'bg-orange-500',
        members: '28,100',
        icon: FiZap,
        pinned: 'WAEC 2026 starts soon! Check the pinned past questions and study guides. Good luck to everyone! ',
        topContributors: [
            { name: 'Fatima B.', coins: 1450, avatar: 'FB' },
            { name: 'Kelechi N.', coins: 1200, avatar: 'KN' },
            { name: 'Aisha M.', coins: 980, avatar: 'AM' },
        ],
        categories: ['All', 'WAEC Prep', 'JAMB', 'Chemistry', 'Physics', 'Mathematics', 'Literature', 'Gist'],
    },
    university: {
        name: 'University Hub',
        level: 'University',
        description: 'Undergraduates sharing notes, past questions and campus life',
        color: 'from-[#FF9F1C] to-[#ffb347]',
        accentColor: '#FF9F1C',
        lightColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800',
        bgAccent: 'bg-blue-500',
        members: '54,300',
        icon: FiStar,
        pinned: 'Internship season is here! Share opportunities, tips and experiences with your fellow students.',
        topContributors: [
            { name: 'Chidi E.', coins: 2450, avatar: 'CE' },
            { name: 'Ngozi A.', coins: 2100, avatar: 'NA' },
            { name: 'Amara O.', coins: 1980, avatar: 'AO' },
        ],
        categories: ['All', 'Lecture Notes', 'Past Questions', 'Campus Gist', 'Internships', 'Projects', 'Research'],
    },
    postgrad: {
        name: 'Postgrad Network',
        level: 'Postgrad',
        description: 'Masters and PhD students collaborating on research and academic excellence',
        color: 'from-[#1F2A1F] to-[#008751]',
        accentColor: '#1F2A1F',
        lightColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-[#1F2A1F]',
        bgAccent: 'bg-purple-500',
        members: '8,900',
        icon: FiAward,
        pinned: 'Research collaboration thread is live! Connect with fellow researchers across Africa.',
        topContributors: [
            { name: 'Dr. Ngozi A.', coins: 3200, avatar: 'NA' },
            { name: 'Prof. Bello K.', coins: 2800, avatar: 'BK' },
            { name: 'Amara P.', coins: 2100, avatar: 'AP' },
        ],
        categories: ['All', 'Research', 'Thesis Help', 'Publications', 'Scholarships', 'Academia', 'Gist'],
    },
}

const mockCommunityPosts = {
    jss: [
        { id: 1, author: 'Emeka O.', avatar: 'EO', time: '1h ago', category: 'Mathematics', title: 'How to solve simultaneous equations easily', content: 'Many JSS students struggle with simultaneous equations. Here is the simplest method that always works...', likes: 89, comments: 23, liked: false, saved: false, trending: true },
        { id: 2, author: 'Blessing A.', avatar: 'BA', time: '3h ago', category: 'Gist', title: 'Our principal just changed the school uniform', content: 'The school just announced a new uniform policy and students are divided on it. What do you think?', likes: 156, comments: 67, liked: false, saved: false, trending: true },
        { id: 3, author: 'Tunde M.', avatar: 'TM', time: '5h ago', category: 'Basic Science', title: 'Notes on Living and Non-Living things', content: 'Complete notes on the characteristics of living things and how to distinguish them from non-living things...', likes: 67, comments: 12, liked: false, saved: false, trending: false },
    ],
    sss: [
        { id: 1, author: 'Fatima B.', avatar: 'FB', time: '1h ago', category: 'WAEC Prep', title: '2024 WAEC Chemistry Past Questions. Full Solutions', content: 'I compiled all 60 questions from the 2024 WAEC Chemistry paper with detailed solutions. This took me 3 days...', likes: 234, comments: 67, liked: false, saved: false, trending: true },
        { id: 2, author: 'Kelechi N.', avatar: 'KN', time: '2h ago', category: 'JAMB', title: 'JAMB 2025 CBT Tips that actually work', content: 'After writing JAMB twice I finally figured out the strategies that help you finish on time and score high...', likes: 412, comments: 134, liked: false, saved: false, trending: true },
        { id: 3, author: 'Aisha M.', avatar: 'AM', time: '6h ago', category: 'Gist', title: 'Our school just banned phones — what do you think?', content: 'The school management sent a circular today saying phones are now completely banned on school premises...', likes: 189, comments: 43, liked: false, saved: false, trending: false },
    ],
    university: [
        { id: 1, author: 'Chidi E.', avatar: 'CE', time: '1h ago', category: 'Campus Gist', title: 'ASUU strike update, what students need to know', content: 'Here is the latest on the ongoing negotiations and what it means for students across Nigerian universities...', likes: 412, comments: 103, liked: false, saved: false, trending: true },
        { id: 2, author: 'Ngozi A.', avatar: 'NA', time: '3h ago', category: 'Lecture Notes', title: 'Complete 300L Engineering Mathematics Notes', content: 'These are my complete notes from this semester covering differential equations, Laplace transforms and more...', likes: 289, comments: 61, liked: false, saved: false, trending: true },
        { id: 3, author: 'Amara O.', avatar: 'AO', time: '5h ago', category: 'Internships', title: 'How I got an internship at Flutterwave as a 200L student', content: 'Many people think internships are only for final year students. Here is how I landed mine in 200L...', likes: 567, comments: 142, liked: false, saved: false, trending: true },
    ],
    postgrad: [
        { id: 1, author: 'Dr. Ngozi A.', avatar: 'NA', time: '2h ago', category: 'Research', title: 'How to write a strong research proposal for funding', content: 'After securing three research grants I want to share exactly what makes a proposal stand out to reviewers...', likes: 198, comments: 54, liked: false, saved: false, trending: true },
        { id: 2, author: 'Prof. Bello K.', avatar: 'BK', time: '4h ago', category: 'Scholarships', title: 'Commonwealth Scholarship 2026, full guide for Nigerians', content: 'I successfully applied for the Commonwealth Scholarship and want to walk you through every step of the process...', likes: 334, comments: 89, liked: false, saved: false, trending: true },
        { id: 3, author: 'Amara P.', avatar: 'AP', time: '8h ago', category: 'Thesis Help', title: 'How to structure your Masters thesis, chapter by chapter', content: 'Many postgrad students struggle with structuring their thesis. Here is the framework I used and recommend...', likes: 156, comments: 38, liked: false, saved: false, trending: false },
    ],
}

function CommunityFeed() {
    const { level } = useParams()
    const navigate = useNavigate()
    const community = communityData[level] || communityData.university
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const [activeCategory, setActiveCategory] = useState('All')
    const [posts, setPosts] = useState(mockCommunityPosts[level] || mockCommunityPosts.university)
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [newPost, setNewPost] = useState({ title: '', content: '', category: community.categories[1] })
    const [postLoading, setPostLoading] = useState(false)
    const [postSuccess, setPostSuccess] = useState(false)
    const [postError, setPostError] = useState('')
    const [joined, setJoined] = useState(false)

    const toggleLike = (id) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
        ))
    }

    const toggleSave = (id) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p))
    }

    const handleCreatePost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim()) {
            setPostError('Title and content are required')
            return
        }
        setPostLoading(true)
        setPostError('')
        try {
            await createPost({ ...newPost, community: level })
            setPostSuccess(true)
            setNewPost({ title: '', content: '', category: community.categories[1] })
            setTimeout(() => { setShowCreatePost(false); setPostSuccess(false) }, 2000)
        } catch (err) {
            setPostError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setPostLoading(false)
        }
    }

    const filteredPosts = posts.filter(p =>
        activeCategory === 'All' || p.category === activeCategory
    )

    return (
        <div className="min-h-screen bg-light md:pl-56 pt-14 md:pt-0">

            <div className={`bg-gradient-to-r ${community.color} px-4 md:px-6 py-4 pb-6 md:py-8`}>
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate('/community')}
                        className="flex items-center gap-2 text-white/70 hover:text-white text-xl mb-4 transition"
                    >
                        <FiArrowLeft size={16} /> All Communities
                    </button>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <community.icon size={24} className="text-white flex-shrink-0" />
                                <h1 className="text-xl md:text-3xl font-extrabold text-white leading-tight">{community.name}</h1>
                            </div>
                            <p className="text-white/80 text-sm max-w-lg mb-4 leading-relaxed">{community.description}</p>
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-1.5 text-white/80 text-xs md:text-sm">
                                    <FiUsers size={13} />
                                    <span>{community.members} members</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-white/80 text-xs md:text-sm">
                                    <FiTrendingUp size={13} />
                                    <span>Active now</span>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setJoined(!joined)}
                            className={`self-start px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${joined ? 'bg-white/20 text-white border border-white/40' : 'bg-white text-gray-800 hover:opacity-90'
                                }`}
                        >
                            {joined ? '✓ Joined' : 'Join Community'}
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6">

                <div className="flex-1 min-w-0">

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${community.lightColor} border ${community.borderColor} rounded-2xl p-4 mb-5 flex items-start gap-3`}
                    >
                        <span className="text-base flex-shrink-0 mt-0.5">📌</span>
                        <p className={`text-sm ${community.textColor} font-medium leading-relaxed w-full`}>{community.pinned}</p>
                    </motion.div>

                    <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
                        {community.categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400'
                                    }`}
                                style={activeCategory === cat ? { backgroundColor: community.accentColor } : {}}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        {filteredPosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                        style={{ backgroundColor: community.accentColor }}
                                    >
                                        {post.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-dark text-sm">{post.author}</p>
                                        <p className="text-xs text-gray-400">{post.time}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {post.trending && (
                                            <span className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                                                Trending
                                            </span>
                                        )}
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${community.lightColor} ${community.textColor}`}>
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
                        ))}
                    </div>
                </div>

                <div className="hidden lg:flex flex-col gap-4 w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl p-4 border border-gray-100">
                        <h3 className="font-bold text-dark text-sm mb-3 flex items-center gap-2">
                            <FiStar size={15} className="text-accent" /> Top Contributors
                        </h3>
                        <div className="flex flex-col gap-3">
                            {community.topContributors.map((c, i) => (
                                <div key={c.name} className="flex items-center gap-2.5">
                                    <span className="text-base">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                                    <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                        style={{ backgroundColor: community.accentColor }}
                                    >
                                        {c.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-dark truncate">{c.name}</p>
                                        <p className="text-xs text-gray-400">{c.coins} coins</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-gray-100">
                        <h3 className="font-bold text-dark text-sm mb-3">📜 Community Rules</h3>
                        <div className="flex flex-col gap-2">
                            {['Be respectful to everyone', 'Share only educational content', 'No spam or self-promotion', 'Credit original sources', 'No hate speech'].map((rule, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <span
                                        className="text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                                        style={{ backgroundColor: community.accentColor }}
                                    >
                                        {i + 1}
                                    </span>
                                    <p className="text-xs text-gray-500 leading-relaxed">{rule}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-dark rounded-2xl p-4">
                        <p className="text-white font-bold text-sm mb-3">Your Stats</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/10 rounded-xl p-2.5 text-center">
                                <p className="text-white font-extrabold text-lg">{user.coins || 50}</p>
                                <p className="text-gray-400 text-xs">Coins</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-2.5 text-center">
                                <p className="text-white font-extrabold text-lg">0</p>
                                <p className="text-gray-400 text-xs">Posts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreatePost(true)}
                className="fixed bottom-8 right-8 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition z-50"
                style={{ backgroundColor: community.accentColor }}
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
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                                    style={{ backgroundColor: community.accentColor }}
                                >
                                    {user.name?.charAt(0) || 'S'}
                                </div>
                                <div>
                                    <p className="font-bold text-dark text-sm">{user.name || 'Student'}</p>
                                    <p className="text-xs text-gray-400">Posting to {community.name}</p>
                                </div>
                            </div>

                            <select
                                value={newPost.category}
                                onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-3 focus:outline-none focus:border-primary transition"
                            >
                                {community.categories.filter(c => c !== 'All').map(c => (
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
                                placeholder="Share your knowledge, ask a question, or drop a gist..."
                                value={newPost.content}
                                onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                rows={5}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-4 focus:outline-none focus:border-primary transition resize-none"
                            />

                            {postError && <p className="text-red-500 text-sm mb-3">{postError}</p>}
                            {postSuccess && <p className="text-sm mb-3 text-center font-medium" style={{ color: community.accentColor }}>✅ Post submitted for review!</p>}

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
                                    className="flex-1 py-3 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
                                    style={{ backgroundColor: community.accentColor }}
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

export default CommunityFeed