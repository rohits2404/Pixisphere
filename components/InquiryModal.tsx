'use client'

import { useModal } from '@/store/useModal'
import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle, X } from "lucide-react"

export default function InquiryModal() {
    const { isOpen, close } = useModal()
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

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
        if (!form.name || !form.email || !form.message) return
        
        console.log('Submitted:', form)
        setSubmitted(true)
        setTimeout(() => {
            close()
            setSubmitted(false)
            setForm({ name: '', email: '', message: '' })
        }, 2000)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div
                ref={modalRef}
                className="animate-scale-in w-full max-w-md"
            >
                <Card className="border-0 shadow-2xl relative overflow-hidden">
                    {/* Glowing gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-purple-50/20 -z-10" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-200/30 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-200/30 blur-3xl" />
                    
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Send Inquiry
                            </CardTitle>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={close}
                                className="rounded-full hover:bg-gray-100/50 text-gray-500 hover:text-gray-900"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-4 text-center animate-fade-in">
                                <div className="relative">
                                    <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
                                    <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping opacity-75" />
                                </div>
                                <h3 className="text-xl font-semibold text-green-600">Inquiry Sent!</h3>
                                <p className="text-gray-600 max-w-md">
                                    Thank you for your message! Our team will get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Your Name</label>
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 border-gray-300 hover:border-gray-400 transition-colors"
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 border-gray-300 hover:border-gray-400 transition-colors"
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Your Message</label>
                                    <Textarea
                                        placeholder="Tell us about your photography needs..."
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 border-gray-300 hover:border-gray-400 transition-colors min-h-[120px]"
                                        required
                                    />
                                </div>
                                
                                <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 pt-6 px-0 pb-0">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={close}
                                        className="w-full sm:w-auto hover:bg-gray-100/70 border-gray-300"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
                                    >
                                        Submit Inquiry
                                    </Button>
                                </CardFooter>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}