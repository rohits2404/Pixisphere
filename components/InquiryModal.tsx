'use client'

import { useModal } from '@/store/useModal'
import { useState, useRef, useEffect } from 'react'

export default function InquiryModal() {

    const { isOpen, close } = useModal()
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    // Close modal when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                close()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, close])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) {
            // Optionally, add some visual feedback for missing fields
            return
        }
        console.log('Submitted:', form)
        setSubmitted(true)
        setTimeout(() => {
            close()
            setSubmitted(false)
            setForm({ name: '', email: '', message: '' })
        }, 1500)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
            ref={modalRef}
            className="bg-white w-full max-w-lg mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scaleIn"
            >
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-extrabold text-gray-800">Send Inquiry</h2>
                    <button
                    onClick={close}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Close modal"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {submitted ? (
                    <div className="text-center py-10">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-xl font-semibold text-green-700">Inquiry sent successfully!</p>
                        <p className="text-gray-500 mt-2">We'll get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        />
                        <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                        type="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        />
                        <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 resize-y"
                        placeholder="Your Message"
                        rows={5} // Increased rows for better initial appearance
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        />
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                            <button
                            type="button"
                            onClick={close}
                            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md"
                            >
                                Submit Inquiry
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
