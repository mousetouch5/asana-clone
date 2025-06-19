export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
      {message}
    </div>
  );
}
