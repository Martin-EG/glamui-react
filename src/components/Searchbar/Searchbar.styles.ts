import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  padding-right: 80px;
  border-radius: ${({ theme }) => theme.radius.xl};
  outline: none;
  transition: all
    var(--motion-duration-slow, ${({ theme }) => theme.motion.duration.slow})
    var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard});
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background: ${({ theme }) => theme.colors.background.page};

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

export const RightSection = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-60%);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;
