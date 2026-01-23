import { AvatarImage, AvatarWrapper } from './Avatar.styled';
import type { Avatar as AvatarType } from './Avatar.types';
import { AVATAR_SIZE } from './Avatar.types';

export const Avatar: AvatarType = ({
  imageUrl,
  altText,
  size = AVATAR_SIZE.MEDIUM,
  isActive = false,
  onClick,
}) => (
  <AvatarWrapper
    size={size}
    isActive={isActive}
    isClickable={!!onClick}
    onClick={onClick}
  >
    <AvatarImage src={imageUrl} alt={altText} />
  </AvatarWrapper>
);
