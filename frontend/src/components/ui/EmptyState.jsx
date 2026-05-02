export default function EmptyState({ title = 'Nothing here yet', description = 'Create your first item to get started.' }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
