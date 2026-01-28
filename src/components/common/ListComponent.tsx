import React from "react";

interface ListComponentProps {
  groups: {
    title: string;
    points: string[];
  }[];
}

export default function ListComponent({ groups }: ListComponentProps) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {groups.map((group) => (
        <div key={group.title} className="mb-4">
          <h3 className="text-2xl font-semibold mb-2 text-(--card-fg)">
            {group.title}
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {group.points.map((pt) => (
              <li key={pt} className="text-xl text-(--card-fg)">
                {pt}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
