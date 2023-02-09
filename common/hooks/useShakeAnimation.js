import { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useShakeAnimation(condition, dependency, iterations = 10) {
  const anim = useRef(new Animated.Value(0));

  const shake = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: -2,
          duration: 20,
          useNativeDriver: true,
        }),
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 20,
          useNativeDriver: true,
        }),
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 20,
          useNativeDriver: true,
        }),
      ]),
      { iterations }
    ).start();
  }, []);

  useEffect(() => {
    if (condition) {
      shake();
    }
  }, [dependency]);

  return anim;
}
