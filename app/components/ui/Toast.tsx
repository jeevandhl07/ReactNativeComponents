import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../assets/icon';
import {
  BORDER_RADIUS,
  COLORS,
  FONT_FAMILY,
  moderateScale,
  SPACING,
  verticalScale,
} from '../../constants';
import { Portal } from './Portal';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

type ToastProps = {
  visible: boolean;
  message: string;
  title?: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
  onHide: () => void;
  style?: StyleProp<ViewStyle>;
};

const variantStyles: Record<
  ToastVariant,
  { color: string; icon: string }
> = {
  success: {
    color: COLORS.success,
    icon: 'checkmark-circle',
  },
  error: {
    color: COLORS.danger,
    icon: 'alert-circle',
  },
  warning: {
    color: COLORS.warning,
    icon: 'warning',
  },
  info: {
    color: COLORS.info,
    icon: 'information-circle',
  },
};

const Toast = ({
  visible,
  message,
  title,
  variant = 'info',
  position = 'bottom',
  duration = 2600,
  onHide,
  style,
}: ToastProps) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(position === 'top' ? -40 : 40))
    .current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tone = variantStyles[variant];

  const dismiss = useCallback(
    (direction = 1) => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: direction * moderateScale(420),
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          onHide();
        }
      });
    },
    [onHide, opacity, translateX],
  );

  useEffect(() => {
    if (!visible) {
      return;
    }

    translateY.setValue(position === 'top' ? -40 : 40);
    translateX.setValue(0);
    opacity.setValue(0);

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 22,
        stiffness: 240,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();

    hideTimeout.current = setTimeout(() => {
      dismiss(position === 'top' ? -1 : 1);
    }, duration);

    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
    };
  }, [dismiss, duration, opacity, position, translateX, translateY, visible]);

  const handleGesture = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      translateX.setValue(event.nativeEvent.translationX);
    },
    [translateX],
  );

  const handleGestureStateChange = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState !== State.ACTIVE) {
        return;
      }

      const { translationX, velocityX } = event.nativeEvent;
      const shouldDismiss =
        Math.abs(translationX) > moderateScale(82) ||
        Math.abs(velocityX) > moderateScale(650);

      if (shouldDismiss) {
        dismiss(translationX < 0 || velocityX < 0 ? -1 : 1);
        return;
      }

      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 220,
      }).start();
    },
    [dismiss, translateX],
  );

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <View
        pointerEvents="box-none"
        style={[
          styles.portal,
          position === 'top'
            ? [styles.portalTop, { paddingTop: insets.top + SPACING.md }]
            : {
                paddingBottom: insets.bottom + SPACING.md,
              },
        ]}
      >
        <PanGestureHandler
          activeOffsetX={[-moderateScale(12), moderateScale(12)]}
          failOffsetY={[-moderateScale(12), moderateScale(12)]}
          onGestureEvent={handleGesture}
          onHandlerStateChange={handleGestureStateChange}
        >
          <Animated.View
            style={[
              styles.toast,
              {
                opacity,
                transform: [{ translateX }, { translateY }],
              },
              style,
            ]}
          >
            <View style={[styles.statusBar, { backgroundColor: tone.color }]} />

            <View style={styles.iconWrap}>
              <Icon
                type="ion"
                name={tone.icon}
                size={moderateScale(20)}
                color={COLORS.white}
              />
            </View>

            <View style={styles.copy}>
              {title ? (
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
              ) : null}
              <Text style={styles.message} numberOfLines={2}>
                {message}
              </Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  portal: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.md + moderateScale(2),
  },
  portalTop: {
    justifyContent: 'flex-start',
  },
  toast: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: BORDER_RADIUS.lg,
    elevation: 12,
    flexDirection: 'row',
    minHeight: verticalScale(58),
    overflow: 'hidden',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + verticalScale(2),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: verticalScale(8) },
    shadowOpacity: 0.14,
    shadowRadius: moderateScale(16),
  },
  statusBar: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: moderateScale(4),
  },
  iconWrap: {
    alignItems: 'center',
    height: moderateScale(28),
    justifyContent: 'center',
    width: moderateScale(28),
  },
  copy: {
    flex: 1,
    marginHorizontal: SPACING.sm,
    minWidth: 0,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONT_FAMILY.bold,
    fontSize: moderateScale(14),
  },
  message: {
    color: '#D1D5DB',
    fontFamily: FONT_FAMILY.regular,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(19),
  },
});

export default Toast;
