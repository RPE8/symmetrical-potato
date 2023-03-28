interface InfoBlockItemProps extends React.HTMLAttributes<HTMLDivElement> {
  valueName: string;
  value: string;
}

const InfoBlockItem = ({
  children,
  valueName,
  value,
  ...props
}: InfoBlockItemProps) => {
  return (
    <div className="flex flex-col items-center" {...props}>
      <span className="text-xs font-medium text-gray-c2 uppercase">
        {valueName}
      </span>
      <span className="text-sm font-semibold text-gray-c3">{value}</span>
    </div>
  );
};

export default InfoBlockItem;
