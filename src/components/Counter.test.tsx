import { fireEvent, render, screen } from '@solidjs/testing-library';
import Counter from './Counter';

describe('<Counter />', () => {
  it('it starts with zero', () => {
    render(() => <Counter />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Clicks: 0');
  });

  it('it increases its value on click', async () => {
    render(() => <Counter />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // the event loop takes one Promise to resolve to be finished
    await Promise.resolve();

    expect(button).toHaveTextContent('Clicks: 1');

    fireEvent.click(button);
    await Promise.resolve();

    expect(button).toHaveTextContent('Clicks: 2');
  });

  it('increments value', async () => {
    const { queryByRole, unmount } = render(() => <Counter />);

    const button = (await queryByRole('button')) as HTMLButtonElement;

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Clicks: 0/);

    fireEvent.click(button);

    expect(button).toHaveTextContent(/Clicks: 1/);
    unmount();
  });

  it('renders 1', () => {
    const { container, unmount } = render(() => <Counter />);
    expect(container).toMatchSnapshot();
    unmount();
  });
});
