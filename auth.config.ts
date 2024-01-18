import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import db from "@/lib/admin/db"
import { z } from 'zod';
import { comparePassword } from "./lib/utils/bcrypt"

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	pages: {
		signIn: '/auth/login',
	},
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
				remember: { label: 'remember', type: 'text' }
			},
			async authorize(credentials) {
				const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

				if (!parsedCredentials.success) {
					throw new Error('Tài khoản hoặc mật khẩu không được để trống')
				}

				const user = await db.user.findUnique({
					where: {
						email: credentials.email as string
					}
				})

				if (!user || !user?.password) {
					throw new Error('Tài khoản không tồn tại')
				}

				const isCorrectPassword = await comparePassword(credentials.password as string, user.password)

				if (!isCorrectPassword) {
					throw new Error('Mật khẩu không đúng');
				}

				return user
			}
		})
	],
})