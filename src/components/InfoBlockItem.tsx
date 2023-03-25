import { FC } from "react";

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
      <span className="text-xs font-medium text-label-description">
        {valueName}
      </span>
      <span className="text-sm font-semibold text-value-description">
        {value}
      </span>
    </div>
  );
};

export default InfoBlockItem;
