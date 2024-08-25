import Form from '@/app/ui/employees/edit-form';
import Breadcrumbs from '@/app/ui/employees/breadcrumbs';
import { fetchEmployeesById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [employeeId] = await Promise.all([
        fetchEmployeesById(id)
    ]);
    if (!employeeId) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Listing', href: '/listing/employees' },
                    {
                        label: 'Edit Employee',
                        href: `/listing/employees/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form employee={employeeId} />
        </main>
    );
}