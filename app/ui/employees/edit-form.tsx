'use client';

import { EmployeesTable } from '@/app/lib/definitions';
import {
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditEmployeeForm({
  employee
}: {
  employee: EmployeesTable;
}) {
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Employee Email */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Employee Email
          </label>
          <div className="relative">
          <input
                id="name"
                name="name"
                type="text"
                defaultValue={employee.email}
                placeholder="Enter Employee Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
          </div>
        </div>
        {/* Employee Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Employee Name
          </label>
          <div className="relative">
          <input
                id="name"
                name="name"
                type="text"
                defaultValue={employee.name}
                placeholder="Enter Employee Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
          </div>
        </div>

        {/* Employee Age */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Employee Age
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="age"
                name="age"
                type="number"
                step="0.01"
                defaultValue={employee.age}
                placeholder="Enter Employee Age"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Employee Salary */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Employee Salary
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="salary"
                name="age"
                type="number"
                step="0.01"
                defaultValue={employee.salary}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/listing/employees"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Employee</Button>
      </div>
    </form>
  );
}
