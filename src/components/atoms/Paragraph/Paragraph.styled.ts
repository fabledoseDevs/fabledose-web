import styled from '@emotion/styled';

export const ParagraphBody = styled.p<{
  foreground: string;
  textAlign: string;
  boldText: boolean;
}>`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  font-family: ${({ theme }) => theme.typography.paragraphs.default.fontFamily};
  color: ${({ theme, foreground }) =>
    theme.palette.byElement.text[
      foreground as keyof typeof theme.palette.byElement.text
    ]};
  text-align: ${({ textAlign }) => textAlign};
  font-weight: ${({ boldText }) => (boldText ? 'bold' : 'normal')};
`;
