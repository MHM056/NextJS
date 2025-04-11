"use server";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    let errors = {};

    if (!email.includes('@')) {
        errors.email = 'Invalid email.';
    }

    if (password.trim().length < 4) {
        errors.password = 'Password must be at least 4 characters long.';
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
        }
    }
    
    const hashedPassword = hashUserPassword(password);
    try {
        createUser(email, hashedPassword);
        redirect('/training');
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'Account for the chosen email already exists.'
                }
            };
        }
        throw error;
    }

}