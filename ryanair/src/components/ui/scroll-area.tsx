

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className = "",
}) => {
  return <div className={`custom-scroll-area ${className}`}>{children}</div>;
};

export default ScrollArea;
