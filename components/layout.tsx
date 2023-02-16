import Header from "./NavBar/navbar";
import type { ReactElement, ReactNode } from "react";
import React from "react";

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="container bg-blue-300">
            <main>{children}</main>
        </div>
    )
}