import { For, createEffect } from 'solid-js';
import { createLocalStore } from '~/features/local-storage/createLocalStore';
import { trpc } from '~/features/trpc';

export default function AgentList() {
  const [agents, setAgents] = createLocalStore('agents', []);
  const [selectedAgent, setSelectedAgent] = createLocalStore(
    'selectedAgent',
    null
  );

  const res = trpc.agent.register.useMutation();
  const selectAgent = trpc.agent.select.useMutation();

  createEffect(() => {
    if (res?.data?.data) {
      const { token, agent } = res.data.data;

      // if not in the agents list, add to list
      if (!agents.filter((a) => a.token === token).length) {
        setAgents([...agents, { token, ...agent }]);
      }
    }
  }, res?.data?.data?.token);

  const _handleClick = async () => {
    await res.mutate('firkenFox34');
  };

  return (
    <div>
      <button
        class="w-[200px] rounded-full bg-gray-100 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem]"
        onClick={_handleClick}
      >
        Add agent
      </button>

      <div class="flex flex-col align-items-center">
        <For each={agents}>
          {(agent, idx) => {
            return (
              <AgentListItem
                agent={agent}
                isSelected={agent.token === selectedAgent.token}
                onClick={() => {
                  setSelectedAgent(agent);
                  selectAgent.mutate(agent.token);
                }}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}

export function AgentListItem(props) {
  const { agent, onClick, isSelected = false } = props;

  return (
    <li
      onClick={onClick}
      class="inline-flex p-4 flex-space-between w-1/2 justify-evenly cursor-pointer"
    >
      <div class={isSelected ? 'text-green-500' : ''}>{agent.symbol}</div>

      <div>- {agent.startingFaction} -</div>

      <div>{agent.credits}</div>
    </li>
  );
}
