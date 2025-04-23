'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginPage, setIsLoginPage] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Check if the user is logged in
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(!!loggedIn);
        
        // Check if we are on the login page
        setIsLoginPage(window.location.pathname === '/admin/login');
        
        // Redirect to login page if not logged in
        if (!loggedIn && window.location.pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [router]);

    // If we are not on the client yet, return only the content
    if (!isClient) {
        return <div className="flex-1">{children}</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {isLoggedIn && !isLoginPage && <AdminSidebar collapsed={false} toggleCollapse={function (): void {
                throw new Error('Function not implemented.');
            } } />}
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
}