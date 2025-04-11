import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";

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
            errors
        }
    }

    const hashedPassword = hashUserPassword(password);
    createUser(email, hashedPassword);
}