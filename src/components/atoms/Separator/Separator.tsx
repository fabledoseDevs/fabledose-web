import { Label, Line, SeparatorBody } from './Separator.styled';
import type { Separator as SeparatorType } from './Separator.types';

export const Separator: SeparatorType = ({ color, label }) => (
  <SeparatorBody>
    {label ? (
      <>
        <Line $variant={color} />
        <Label $variant={color}>{label}</Label>
        <Line $variant={color} />
      </>
    ) : (
      <Line $variant={color} />
    )}
  </SeparatorBody>
);
