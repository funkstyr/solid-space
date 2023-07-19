import { createLocalStore } from '~/features/local-storage/createLocalStore';
import { trpc } from '~/features/trpc';

export default function AgentList() {
  const [agents, setAgents] = createLocalStore('agents', [
    { id: 1, name: 'agent 1' },
  ]);

  const newAgent = trpc.agent.register.useMutation();

  const _handleClick = async () => {
    console.log('add agent');

    const data = await newAgent.mutate('firkenFox2');

    console.log('trpc agent', data);
  };

  return (
    <div>
      <div>agents:{JSON.stringify(agents)}</div>

      <button onClick={_handleClick}>Add agent</button>
    </div>
  );
}
