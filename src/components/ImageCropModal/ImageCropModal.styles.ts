import { styled } from 'styled-components';

export const CropArea = styled.div`
  width: 100%;
  height: 320px;

  position: relative;
  overflow: hidden;

  background: ${({ theme }) => theme.colors.surface.canvas};
  border-radius: ${({ theme }) => theme.radius.sm};
`;
