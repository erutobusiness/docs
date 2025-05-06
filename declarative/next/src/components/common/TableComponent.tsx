'use client';

interface TableProps {
  headers: string[];
  rows: string[][];
}

export default function TableComponent({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border-collapse bg-[var(--background)] rounded-lg overflow-hidden border border-[var(--accent-dark)]">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-center text-sm font-bold text-[var(--button-secondary-fg)]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--accent-dark)]">
          {rows.map((row, rowIndex) => (
            <tr
              key={row.join('-')}
              className={
                rowIndex % 2 === 0
                  ? 'bg-[var(--background)]'
                  : 'bg-[var(--primary-dark-translucent)]'
              }
            >
              {row.map((cell) => (
                <td key={cell} className="px-6 py-4 text-sm text-[var(--card-fg)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
