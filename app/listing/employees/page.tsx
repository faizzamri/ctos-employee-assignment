import Pagination from '@/app/ui/employees/pagination';
import Table from '@/app/ui/employees/table';
import { CreateEmployee } from '@/app/ui/employees/buttons';
import { lusitana } from '@/app/ui/fonts';
import { EmployeesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchEmployeesPages } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchEmployeesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Employees Listing</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search employee..." /> */}
        <CreateEmployee />
      </div>
      <Suspense key={query + currentPage} fallback={<EmployeesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}