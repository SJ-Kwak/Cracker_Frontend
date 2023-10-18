/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { Text } from "react-native";

export function TextPretendard({ children, style, ...rest }) {
  return (
    <Text style={[{ fontFamily: "Pretendard", color: 'black' }, style]} {...rest}>
      {children}
    </Text>
  );
}
