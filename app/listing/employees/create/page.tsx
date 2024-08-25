import Form from '@/app/ui/employees/create-form';
import Breadcrumbs from '@/app/ui/employees/breadcrumbs';
import { fetchEmployees } from '@/app/lib/data';
 
export default async function Page() {
  const employees = await fetchEmployees();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Listing', href: '/listing/employees' },
          {
            label: 'Create Employee',
            href: '/listing/employees/create',
            active: true,
          },
        ]}
      />
      <Form employees={employees} />
    </main>
  );
}