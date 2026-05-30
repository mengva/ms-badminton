'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@workspace/ui/components/badge';

export const columns: ColumnDef<any>[] = [
  { accessorKey: 'id', header: 'ລໍາດັບ' },
  { accessorKey: 'fullName', header: 'ຊື່ເຕັມ' },
  { accessorKey: 'phoneNumber', header: 'ເບີໂທ' },
  { accessorKey: 'position', header: 'ຕຳແໜ່ງ' },
  {
    accessorKey: 'salary',
    header: 'ເງິນເດືອນ',
    cell: ({ row }) => `${Number(row.original.salary || 0).toLocaleString()} ກີບ`
  },
  {
    accessorKey: 'isActive',
    header: 'ສະຖານະ',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'default' : "destructive"}>
        {row.original.isActive ? 'ເຮັດວຽກ' : 'ຢຸດເຮັດວຽກ'}
      </Badge>
    )
  },
];