"use client";

import type { Session } from "next-auth";
import { useContext, createContext, useState } from "react"

type Props = {
  children?: React.ReactNode;
  session: Session | null
};

export const AuthProvider = async ({ children, session }: Props) => {
  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
};

const AuthContext = createContext<Session | null>(null)

export const useAuthContext = () => useContext(AuthContext)