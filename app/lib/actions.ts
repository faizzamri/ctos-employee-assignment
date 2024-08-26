'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    email: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter the name.',
    }),
    salary: z.coerce
        .number()
        .int({ message: 'Please enter decimal amount only' })
        .positive({ message: 'Please enter an amount greater than $0.' }),
    age: z.coerce
        .number()
        .int({ message: 'Please enter a valid age' })
        .positive({ message: 'Please enter a valid age' }),
    image_url: z.string(),
});

export type State = {
    errors?: {
        name?: string[];
        salary?: string[];
        age?: string[];
        email?: string[];
        image_url?: string[];
    };
    message?: string | null;
};

const CreateEmployee = FormSchema.omit({ });
// Use Zod to update the expected types
const UpdateEmployee = FormSchema.omit({ });

export async function createEmployee(prevState: State, formData: FormData) {
    
    // Validate form using Zod
    const validatedFields = CreateEmployee.safeParse({
        name: formData.get('name'),
        salary: formData.get('salary'),
        age: formData.get('age'),
        email: formData.get('email'),
        image_url: formData.get('image_url'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Employee.',
        };
    }

    // Prepare data for insertion into the database
    const { name, salary, age, email, image_url } = validatedFields.data;

    // Insert data into the database
    try {
        await sql`
        INSERT INTO employees (email, name, salary, age, image_url)
        VALUES (${email}, ${name}, ${salary}, ${age}, ${image_url})
      `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Employee.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/listing/employees');
    redirect('/listing/employees');
}

export async function updateEmployee(
    id: number,
    prevState: State,
    formData: FormData,
) {
    console.log("masuk dalam ni")
    const validatedFields = UpdateEmployee.safeParse({
        id: formData.get('id'),
        name: formData.get('name'),
        salary: formData.get('salary'),
        age: formData.get('age'),
        email: formData.get('email'),
        image_url: formData.get('image_url'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Employee.',
        };
    }

    const { name, salary, age, email, image_url } = validatedFields.data;

    try {
        await sql`
        UPDATE employees
        SET name = ${name}, salary = ${salary}, age = ${age}, email= ${email}, image_url = ${image_url}
        WHERE id = ${id}
      `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Employees.' };
    }
    console.log("Berjaya update")

    revalidatePath('/listing/employees');
    redirect('/listing/employees');
}

export async function deleteEmployee(id: number) {
    try {
        await sql`DELETE FROM employees WHERE id = ${id}`;
        revalidatePath('/listing/employees');
        return { message: 'Deleted Employee.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Employee.' };
    }
}