interface AdPlaceholderProps {
  position: 'top' | 'middle' | 'bottom';
  height?: string;
}

export const AdPlaceholder = ({ position, height = '200px' }: AdPlaceholderProps) => {
  return (
    <div className="w-full">
      <div
        className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center my-6"
        style={{ height }}
      >
        <p className="text-gray-500 text-sm">
          Ad Space - {position.charAt(0).toUpperCase() + position.slice(1)}
        </p>
      </div>
    </div>
  );
};
