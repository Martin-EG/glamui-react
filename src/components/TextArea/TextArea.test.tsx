import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';

import TextArea from './TextArea';

describe('TextArea', () => {
  const notesLabel = 'Notes';

  it('renders textarea correctly', () => {
    render(<TextArea placeholder="Describe the product" />);

    expect(
      screen.getByPlaceholderText('Describe the product'),
    ).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TextArea label={notesLabel} id="description" />);

    expect(screen.getByLabelText(notesLabel)).toBeInTheDocument();
  });

  it('renders error message and aria attributes', () => {
    render(
      <TextArea
        id="description"
        label={notesLabel}
        error="Product notes are required"
      />,
    );

    const textArea = screen.getByLabelText(notesLabel);
    const errorMessage = screen.getByText('Product notes are required');

    expect(textArea).toHaveAttribute('aria-invalid', 'true');
    expect(textArea).toHaveAttribute('aria-describedby', 'description-error');
    expect(errorMessage).toHaveAttribute('id', 'description-error');
  });

  it('handles disabled state', () => {
    render(<TextArea disabled label={notesLabel} />);

    expect(screen.getByLabelText(notesLabel)).toBeDisabled();
  });

  it('passes change events to textarea element', () => {
    const handleChange = jest.fn();
    render(<TextArea label={notesLabel} onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText(notesLabel), {
      target: { value: 'New product' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
