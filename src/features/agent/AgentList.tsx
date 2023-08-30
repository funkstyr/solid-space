import { For, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { createLocalStore } from "~/features/local-storage";
import { trpc } from "~/features/trpc";

interface Agent {
  accountId: string;
  credits: number;
  headquarters: string;
  startingFaction: string;
  symbol: string;
  token: string;
}

export default function AgentList() {
  const [agents, setAgents] = createLocalStore("agents", []);
  const [selectedAgent, setSelectedAgent] = createLocalStore(
    "selectedAgent",
    null
  );

  const [agentInput, setAgentInput] = createStore<{ agent: string }>({
    agent: "",
  });

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
    await res.mutate(agentInput.agent);
  };

  return (
    <div class=''>
      <div class='flex flex-row justify-center items-end gap-2'>
        <div class='form-control w-full max-w-xs'>
          <label class='label'>
            <span class='label-text'>Create Agent</span>
          </label>
          <input
            class='input input-bordered w-full max-w-xs'
            type='text'
            name='agent'
            placeholder='agent name'
            value={agentInput.agent}
            onInput={(evt) => setAgentInput({ agent: evt.target.value })}
          />
        </div>

        <button class='btn btn-outline' onClick={_handleClick}>
          Add agent
        </button>
      </div>

      <div class='flex flex-row justify-center'>
        <p>Selected: {selectedAgent.symbol}</p>
      </div>

      <div class='flex flex-col align-items-center'>
        <p>Agents:</p>

        <For each={agents}>
          {(agent: Agent, _idx) => {
            return (
              <AgentListItem
                agent={agent}
                isSelected={agent.accountId === selectedAgent.accountId}
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

interface AgentListeItemProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
}

export function AgentListItem(props: AgentListeItemProps) {
  const { agent, onClick, isSelected = false } = props;

  return (
    <li
      onClick={onClick}
      class='inline-flex p-4 flex-space-between w-1/2 justify-evenly cursor-pointer'
    >
      <div class={isSelected ? "text-green-500" : ""}>{agent.symbol}</div>

      <div>- {agent.startingFaction} -</div>

      <div>{agent.credits}</div>
    </li>
  );
}
