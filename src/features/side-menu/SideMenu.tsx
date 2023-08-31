import { unstable_clientOnly } from "solid-start";

import { MenuGroup } from "./MenuGroup";
import { MenuItem } from "./MenuItem";
import { MenuHeader } from "./MenuHeader";

const MenuFooter = unstable_clientOnly(() =>
  import("~/features/side-menu/MenuFooter").then((mod) => mod.MenuFooter),
);

export function SideMenu() {
  return (
    <div class="flex h-screen flex-col justify-between border-e bg-white">
      <div class="px-4 py-6">
        <MenuHeader title="Solid Space" />

        <ul class="mt-6 space-y-1">
          <MenuItem label="Agents" isActive />

          <MenuGroup title="Teams">
            <MenuItem label="Banned Users" />
            <MenuItem label="Calendar" />
          </MenuGroup>

          <MenuItem label="Billing" />
          <MenuItem label="Invoices" />

          <MenuGroup title="Account">
            <MenuItem label="Details" />
            <MenuItem label="Security" />

            <li>
              <form action="/logout">
                <button
                  type="submit"
                  class="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                >
                  Logout
                </button>
              </form>
            </li>
          </MenuGroup>
        </ul>
      </div>

      <MenuFooter />
    </div>
  );
}
