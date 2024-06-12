import Cover from '@/components/common/Cover';

function MonotonicCard({ comic }) {
  return (
    <div className="w-full rounded shadow-xl">
      {/* Cover */}
      <div className="md-primary-border rounded">
        <Cover comic={comic} />
      </div>

      {/* Chapter */}
      <div className="flex flex-col p-1 pb-2">
        <p className="limited-line-2 font-medium">{comic.name}</p>
      </div>
    </div>
  );
}

export default MonotonicCard;
