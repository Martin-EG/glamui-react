import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';

import Select from './Select';

const options = [
  { label: 'Makeup', value: 'makeup' },
  { label: 'Fragrance', value: 'fragrance' },
];

const inventoryAddProduct = {
  typeLabel: 'Type',
  typePlaceholder: 'Select a type',
};

describe('Select', () => {
  it('renders select with placeholder and options', () => {
    render(
      <Select
        placeholder={inventoryAddProduct.typePlaceholder}
        options={options}
        defaultValue=""
      />,
    );

    expect(
      screen.getByText(inventoryAddProduct.typePlaceholder),
    ).toBeInTheDocument();
    expect(screen.getByText('Makeup')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(
      <Select
        label={inventoryAddProduct.typeLabel}
        placeholder={inventoryAddProduct.typePlaceholder}
        options={options}
        defaultValue=""
      />,
    );

    expect(
      screen.getByLabelText(inventoryAddProduct.typeLabel),
    ).toBeInTheDocument();
  });

  it('renders error message and aria attributes', () => {
    render(
      <Select
        id="product-type"
        label={inventoryAddProduct.typeLabel}
        options={options}
        error="Select an option"
      />,
    );

    const select = screen.getByLabelText(inventoryAddProduct.typeLabel);
    const errorMessage = screen.getByText('Select an option');

    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', 'product-type-error');
    expect(errorMessage).toHaveAttribute('id', 'product-type-error');
  });

  it('handles disabled state', () => {
    render(
      <Select
        disabled
        label={inventoryAddProduct.typeLabel}
        options={options}
      />,
    );

    expect(screen.getByLabelText(inventoryAddProduct.typeLabel)).toBeDisabled();
  });

  it('passes change events to select element', () => {
    const handleChange = jest.fn();
    render(
      <Select
        label={inventoryAddProduct.typeLabel}
        options={options}
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(inventoryAddProduct.typeLabel), {
      target: { value: 'fragrance' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
