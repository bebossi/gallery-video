interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      data-cy={label}
      onClick={onClick}
      className="px-4 py-3 mt-1 hover:bg-neutral-900 hover:cursor-pointer hover:rounded-md transition font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuItem;
