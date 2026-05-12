import { Text, View } from "react-native";

import { AvatarOption, getAvatarOption } from "../contexts/auth-context";
import { avatarViewStyles as styles } from "../styles/shared-styles";

type Props = {
  avatarId?: string;
  option?: AvatarOption;
  size?: number;
};

export function AvatarView({ avatarId, option, size = 52 }: Props) {
  const avatar = option ?? getAvatarOption(avatarId);
  const fontSize = size >= 72 ? 24 : 16;

  return (
    <View
      style={[
        styles.avatar,
        {
          backgroundColor: avatar.backgroundColor,
          height: size,
          width: size,
        },
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            color: avatar.textColor,
            fontSize,
          },
        ]}
      >
        {avatar.initials}
      </Text>
    </View>
  );
}
