import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { SiteOverviewCardProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Typo from '@/src/shared/components/Typo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FALLBACK_MAP from '@/assets/images/map.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SiteOverviewCard = ({
  siteName,
  address,
  mapImage,
}: SiteOverviewCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const source = !mapImage
    ? FALLBACK_MAP
    : typeof mapImage === 'number'
      ? mapImage
      : { uri: mapImage };

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    //  reset all transforms on close
    scale.value = 1;
    savedScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    setModalVisible(false);
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // accumulate translation from saved offset
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      //  save position so next pan starts from here
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <>
      {/* Card */}
      <TouchableOpacity onPress={handleModalOpen} activeOpacity={0.9}>
        <ImageBackground
          source={source}
          style={styles.card}
          imageStyle={styles.cardImage}
        >
          <View style={styles.overlay} />
          <View style={styles.info}>
            <Typo
              size={verticalScale(14)}
              fontWeight={'bold'}
              color={palette.white}
            >
              {siteName}
            </Typo>
            <View style={styles.addressRow}>
              <Icon.MapPinIcon
                size={verticalScale(12)}
                color={palette.white}
                weight="fill"
              />
              <Typo size={verticalScale(11)} color={palette.white}>
                {address}
              </Typo>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={[styles.modalOverlay, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View>
                <Typo
                  size={verticalScale(14)}
                  fontWeight={'bold'}
                  color={light.textPrimary}
                >
                  {siteName}
                </Typo>
                <View style={styles.addressRow}>
                  <Icon.MapPinIcon
                    size={verticalScale(12)}
                    color={light.textSecondary}
                    weight="fill"
                  />
                  <Typo size={verticalScale(11)} color={light.textSecondary}>
                    {address}
                  </Typo>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleModalClose}
                style={styles.closeBtn}
              >
                <Icon.XIcon
                  size={verticalScale(18)}
                  color={light.textPrimary}
                  weight="bold"
                />
              </TouchableOpacity>
            </View>

            {/* Zoomable map —  wrap in a container */}
            <View style={styles.mapContainer}>
              <GestureDetector gesture={composed}>
                <Animated.View style={[styles.imageContainer, animatedStyle]}>
                  <Animated.Image
                    source={source}
                    style={styles.zoomImage}
                    resizeMode="contain"
                  />
                </Animated.View>
              </GestureDetector>
            </View>

            <Typo
              size={verticalScale(11)}
              color={light.textSecondary}
              style={styles.hint}
            >
              Pinch to zoom · Drag to pan
            </Typo>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

export default SiteOverviewCard;

const styles = StyleSheet.create({
  card: {
    height: verticalScale(180),
    borderRadius: radius._15,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: radius._15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: light.shadow,
    borderRadius: radius._15,
  },
  info: {
    padding: spacingX._15,
    gap: spacingY._5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: light.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._15,
    borderBottomWidth: 1,
    borderBottomColor: light.border,
  },
  closeBtn: {
    padding: spacingX._5,
    backgroundColor: light.border,
    borderRadius: radius.full,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden', // clips image when panning outside bounds
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.75,
  },
  hint: {
    textAlign: 'center',
    paddingVertical: spacingY._15,
  },
});
