import { unstable_clientOnly } from 'solid-start';

const AgentList = unstable_clientOnly(
  () => import('~/features/agent/AgentList')
);

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <AgentList />
    </main>
  );
}
