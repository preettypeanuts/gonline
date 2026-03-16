'use client'
import Image from "next/image"
import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Send } from "lucide-react"

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    const [status, setStatus] = useState({
        loading: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
    }

    return (
        <section>
            <div className="grid grid-cols-2 gap-2">
                <div className="py-3 pl-10 pr-3 bg-black dark:bg-white rounded-r-3xl relative">
                    <div className="rounded-out-lt-3xl bg-black dark:bg-white"></div>
                    <div className="rounded-out-lb-3xl bg-black dark:bg-white"></div>

                    <div className="relative">
                        <Image
                            width={500}
                            height={500}
                            className="w-full object-cover rounded-2xl h-[65lvh]"
                            src="https://images.unsplash.com/photo-1652964999467-91e0c97c5f71?q=80&w=1069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />

                        <div className="absolute bottom-0 right-0 pl-4 pt-2 pb-1 pr-1 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-tl-3xl text-lg">
                        <div className="rounded-out-rt-xl bg-black dark:bg-white"></div>
                        <div className="rounded-out-bl-xl bg-black dark:bg-white"></div>
                            Contact Us!
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-black pl-3 py-3 pr-10 rounded-l-3xl relative">
                    <div className="rounded-out-rt-3xl bg-white dark:bg-black"></div>
                    <div className="rounded-out-rb-3xl bg-white dark:bg-black"></div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full h-full">
                        {/* Name Input */}
                        <div className="relative">
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer h-23 w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 bg-lightColor dark:bg-darkColor focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                            />
                            <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                Name
                            </p>
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer h-23 w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 bg-lightColor dark:bg-darkColor focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                            />
                            <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                Email
                            </p>
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                            <Input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer h-23 w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 bg-lightColor dark:bg-darkColor focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                            />
                            <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                Phone
                            </p>
                        </div>

                        {/* Message Textarea */}
                        <div className="relative">
                            <Textarea
                                rows={5}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer h-23 w-full pl-20 sm:pl-24 pr-3 py-2 sm:py-3 resize-none bg-lightColor dark:bg-darkColor focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                            />
                            <p className="absolute top-4 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                Message
                            </p>
                        </div>

                        {/* Submit Button */}
                        <Button
                            variant={"invert"}
                            disabled={status.loading}
                            className="w-full grow flex items-center justify-center gap-2 py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status.loading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="text-sm" />
                                    <span>Send Message</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}