import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';

import Searchbar from './Searchbar';

describe('Searchbar', () => {
  it('renders search input', () => {
    render(<Searchbar value="" onChange={jest.fn()} placeholder="Search..." />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders clear button when value is present', () => {
    render(<Searchbar value="test" onChange={jest.fn()} onClear={jest.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Clear search' }),
    ).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    const onClear = jest.fn();
    render(<Searchbar value="test" onChange={jest.fn()} onClear={onClear} />);

    screen.getByRole('button', { name: 'Clear search' }).click();

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when input value changes', async () => {
    const onChange = jest.fn();
    render(<Searchbar value="" onChange={onChange} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
