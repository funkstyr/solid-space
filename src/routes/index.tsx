import { A, unstable_clientOnly } from 'solid-start';

import Counter from '~/components/Counter';
// import AgentList from '~/features/agent/AgentList';
import { trpc } from '~/features/trpc';

const AgentList = unstable_clientOnly(
  () => import('~/features/agent/AgentList')
);

export default function Home() {
  const hello = trpc.example.hello.useQuery(() => 'World');

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>

      <Counter />

      <p class="mt-8">
        Visit{' '}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{' '}
        to learn how to build Solid apps.
      </p>

      <p class="my-4">
        <span>Home</span>
        {' - '}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{' '}
      </p>

      <pre>
        <code>{JSON.stringify(hello.data, null, 2)}</code>
      </pre>

      <AgentList />
    </main>
  );
}
