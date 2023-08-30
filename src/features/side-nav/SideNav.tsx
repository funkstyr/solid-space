import { children } from "solid-js";

export function SideNav(props) {
  const c = children(() => props.chidlren);

  return (
    <div class='drawer '>
      <input id='my-drawer-2' type='checkbox' class='drawer-toggle' />
      <div class='drawer-content flex flex-col items-center justify-center'>
        {/* Page content here */}
        {c()}

        <label html-for='my-drawer-2' class='btn btn-primary drawer-button'>
          Open drawer
        </label>
      </div>
      <div class='drawer-side'>
        <label html-for='my-drawer-2' class='drawer-overlay'></label>
        <ul class='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
