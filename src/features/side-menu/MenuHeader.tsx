interface MenuHeaderProps {
  title: string;
}

export function MenuHeader(props: MenuHeaderProps) {
  const { title } = props;

  return (
    <span class="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
      {title}
    </span>
  );
}
