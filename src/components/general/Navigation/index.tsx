import { useRouterContext } from "~/utils/useRouterContext";
import Logo from "~/assets/logo.svg?react";
import InternalLink from "../InternalLink";

export default function Navigation() {
  const { theme } = useRouterContext();
  return (
    <nav
      className="data-[theme=light]:text-stone-100 flex gap-4 items-center py-4 px-6 absolute top-0 left-0 right-0 text-stone-800 z-10 transition-colors"
      data-theme={theme}
    >
      <InternalLink href="/" className="hover:cursor-pointer">
        <Logo className="w-11" />
      </InternalLink>
    </nav>
  );
}
