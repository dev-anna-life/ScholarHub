/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { FiUsers, FiArrowRight, FiBookOpen, FiTrendingUp, FiStar, FiZap, FiAward } from "react-icons/fi"
import Navbar from "../components/Navbar"

const communities = [
    {
        id: 'jss',
        name: 'JSS Community',
        level: 'JSS',
        description: 'Junior secondary school students sharing notes, gist, assignments and exam tips.',
        color: 'from-[#1F2A1F] to-[#2d4a2d]',
        lightColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-[#1F2A1F]',
        accentColor: '#008751',
        members: '12,400',
        posts: '3,200',
        icon: FiBookOpen,
        tags: ['Basic Science', 'Mathematics', 'English', 'Social Studies', 'CRS/IRS'],
        topContributor: 'Emeka O.',
        weeklyPosts: 142,
    },
    {
        id: 'sss',
        name: 'SSS Community',
        level: 'SSS',
        description: 'Senior secondary students conquering WAEC, NECO, JAMB and sharing everything in between.',
        color: 'from-[#008751] to-[#00a86b]',
        lightColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-800',
        accentColor: '#008751',
        members: '28,100',
        posts: '9,800',
        icon: FiZap,
        tags: ['WAEC Prep', 'JAMB', 'Chemistry', 'Physics', 'Literature'],
        topContributor: 'Fatima B.',
        weeklyPosts: 389,
    },
    {
        id: 'university',
        name: 'University Hub',
        level: 'University',
        description: 'Undergraduates sharing lecture notes, past questions, campus gist and career advice.',
        color: 'from-[#FF9F1C] to-[#ffb347]',
        lightColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-800',
        accentColor: '#FF9F1C',
        members: '54,300',
        posts: '21,600',
        icon: FiStar,
        tags: ['Lecture Notes', 'Past Questions', 'Campus Gist', 'Internships', 'Projects'],
        topContributor: 'Chidi E.',
        weeklyPosts: 762,
    },
    {
        id: 'postgrad',
        name: 'Postgrad Network',
        level: 'Postgrad',
        description: 'Masters and PhD students collaborating on research, theses and academic excellence.',
        color: 'from-[#1F2A1F] to-[#008751]',
        lightColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-[#1F2A1F]',
        accentColor: '#1F2A1F',
        members: '8,900',
        posts: '4,100',
        icon: FiAward,
        tags: ['Research', 'Thesis Help', 'Publications', 'Scholarships', 'Academia'],
        topContributor: 'Dr. Ngozi A.',
        weeklyPosts: 98,
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' }
    })
}

function Community() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    return (
        <div className="min-h-screen bg-light md:pl-56 pt-16 md:pt-0">
            <div className="sticky top-0 z-40 bg-light/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl md:text-2xl font-extrabold text-dark">Communities</h1>
                    <p className="text-sm md:text-sm text-gray-400 mt-2">Find your people. Share your knowledge</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">

                {user.level && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-dark rounded-2xl p-5 mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Your community</p>
                            <p className="text-white font-bold text-lg">
                                {communities.find(c => c.level === user.level)?.name || 'ScholarHub'}
                                <p className="text-gray-400 text-xs mt-1">
                                    Based on your education level - {user.level}
                                </p>
                            </p>
                        </div>
                        <button
                            onClick={() => navigate(`/community/${user.level?.toLowerCase()}`)}
                            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition flex items-center gap-2">
                            Enter <FiArrowRight size={15} />
                        </button>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    {communities.map((c, i) => (
                        <motion.div
                            key={c.id}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ y: -4 }}
                            className={`bg-white rounded-2xl border ${c.borderColor} overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl`}
                            onClick={() => navigate(`/community/${c.id}`)}
                        >
                            <div className={`bg-gradient-to-r ${c.color} p-5`}>
                                <div className="flex items-center justify-between mb-3">
                                    <c.icon size={28} className="text-white" />
                                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        {c.weeklyPosts} posts this week
                                    </span>
                                </div>
                                <h2 className="text-white font-extrabold text-xl mb-1">{c.name}</h2>
                                <p className="text-white/80 text-sm leading-relaxed">{c.description}</p>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                        <FiUsers size={14} />
                                        <span>{c.members} members</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                        <FiBookOpen size={14} />
                                        <span>{c.posts} posts</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                        <FiStar size={14} />
                                        <span>{c.topContributor}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {c.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className={`${c.lightColor} ${c.textColor} text-xs font-medium px-2.5 py-1 rounded-full border ${c.borderColor}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white hover:opacity-90"
                                    style={{ backgroundColor: c.accentColor }}
                                >
                                    Enter Community <FiArrowRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Community