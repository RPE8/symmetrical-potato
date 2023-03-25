interface SunsetSunriseBlockItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  valueName: string;
  value: string;
}

const SunsetSunriseBlockItem = ({
  children,
  valueName,
  value,
  ...props
}: SunsetSunriseBlockItemProps) => {
  return (
    <p className="flex items-center gap-1" {...props}>
      <span className="text-xs font-normal text-gray-c2">{valueName}:</span>{" "}
      <span className="text-xs font-normal text-gray-c4">{value}</span>
    </p>
  );
};

export default SunsetSunriseBlockItem;
