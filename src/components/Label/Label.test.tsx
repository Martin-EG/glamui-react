import { render, screen } from '../../test-utils';
import 'jest-styled-components';

import Label from './Label';

describe('Label', () => {
  it('renders the label text', () => {
    render(<Label text="Test Label" htmlFor="test-input" />);
    const labelElement = screen.getByText('Test Label');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement.closest('label')).toHaveAttribute('for', 'test-input');
  });
});
