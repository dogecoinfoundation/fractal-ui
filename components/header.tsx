type HeaderProps = {
  label: string;
};
export const Header = ({ label }: HeaderProps) => (
  <header className="text-xl font-medium transition-colors [&_svg]:size-4 [&_svg]:shrink-0 select-none">
    <h1>{label}</h1>
  </header>
);
