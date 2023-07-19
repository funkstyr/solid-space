import { createLocalStore } from '~/features/local-storage/createLocalStore';

export default function AgentList() {
  const [agents, setAgents] = createLocalStore('agents', [
    { id: 1, name: 'agent 1' },
  ]);

  return <div>agents:{JSON.stringify(agents)}</div>;
}
