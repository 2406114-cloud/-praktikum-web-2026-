"use client"

import { useActionState } from "react"
import { registerAction } from "@/actions/auth"
import Link from "next/link"

const RegisterPage = () => {
    const [state, formAction, isPending] = useActionState(registerAction, undefined)

    return (
        // Latar belakang hitam pekat
        <main className="relative min-h-screen flex items-center justify-center bg-zinc-950 p-4 overflow-hidden font-sans">
            
            {/* Ornamen Cahaya Latar Belakang (Agar efek kaca terlihat) */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>

            {/* Kartu Kaca (Glassmorphism) */}
            <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/10 p-8">
                
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Register Akun</h1>
                    <p className="text-sm text-zinc-400">Simpan akun baru ke database</p>
                </div>

                {/* Notifikasi Error */}
                {state?.error && (
                    <div className="mb-6 p-4 text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-xl flex items-center gap-2 backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{state.error}</span>
                    </div>
                )}

                {/* Form */}
                <form action={formAction} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Masukkan nama Anda"
                            required
                            className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="nama@email.com"
                            required
                            className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Minimal 6 karakter"
                            required
                            className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-4 w-full rounded-xl bg-white py-3 font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Memproses..." : "Daftar"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-zinc-400">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-white font-medium hover:text-blue-400 hover:underline transition-all">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default RegisterPage