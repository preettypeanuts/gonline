'use client'
import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import SmartImage from "./smart-image"

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus("loading")

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed")

            setStatus("success")
            setFormData({ name: "", email: "", phone: "", message: "" })
        } catch {
            setStatus("error")
        }
    }

    return (
        <section>
            <div className="grid md:grid-cols-2 gap-10 md:gap-2">
                <div className="py-3 pl-4 md:pl-10 mr-4 md:mr-0 pr-3 bg-black dark:bg-white rounded-r-3xl relative">
                    <div className="rounded-out-lt-3xl bg-black dark:bg-white"></div>
                    <div className="rounded-out-lb-3xl bg-black dark:bg-white"></div>

                    <div className="relative">
                        <SmartImage
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

                <div className="bg-white dark:bg-black pl-3 py-3 pr-4 md:pr-10 ml-4 md:ml-0 rounded-l-3xl relative self-end">
                    <div className="rounded-out-rt-3xl bg-white dark:bg-black"></div>
                    <div className="rounded-out-rb-3xl bg-white dark:bg-black"></div>

                    {status === "success" ? (
                        <div className="flex flex-col items-center justify-center gap-4 md:h-[65lvh] py-16 md:py-0 text-center">
                            <CheckCircle className="size-12 text-green-500" />
                            <h3 className="font-bold text-xl">Pesan Terkirim!</h3>
                            <p className="text-sm text-neutral-500">
                                Terima kasih! Kami akan menghubungi kamu dalam 1x24 jam.
                            </p>
                            <Button variant="invert" onClick={() => setStatus("idle")}>
                                Kirim Pesan Lain
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full md:h-[65lvh]">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer h-full w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 bg-lightColor dark:bg-darkColor focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                                />
                                <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                    Name
                                </p>
                            </div>

                            <div className="relative flex-1">
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className="peer h-full w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 bg-lightColor dark:bg-darkColor focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                                />
                                <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                    Email
                                </p>
                            </div>

                            <div className="relative flex-1">
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className="peer h-full w-full pl-16 sm:pl-20 pr-3 py-2 sm:py-3 bg-lightColor dark:bg-darkColor focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                                />
                                <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                    Phone
                                </p>
                            </div>

                            <div className="relative flex-[2]">
                                <Textarea
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer h-full w-full pl-20 sm:pl-24 pr-3 py-2 sm:py-3 resize-none bg-lightColor dark:bg-darkColor focus:outline-none focus:ring-2 focus:ring-secondaryLight duration-200 ease-in-out"
                                />
                                <p className="absolute top-4 left-3 text-xs sm:text-sm opacity-60 pointer-events-none">
                                    Message
                                </p>
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-500 text-sm">
                                    <AlertCircle className="size-4 shrink-0" />
                                    <span>Gagal mengirim pesan. Silakan coba lagi.</span>
                                </div>
                            )}

                            <Button
                                variant="invert"
                                disabled={status === "loading"}
                                className="w-full flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <>
                                        <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
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
                    )}
                </div>
            </div>
        </section>
    )
}