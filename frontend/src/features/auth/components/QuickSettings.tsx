import { light, palette, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import { QuickSettingsProps } from '@/src/types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typo from '@/src/shared/components/Typo';

const QuickSettings = ({
  items,
  selected,
  onToggle,
  containerStyle,
}: QuickSettingsProps) => {
  const handlePress = (id: string) => {
    onToggle(id, !selected.includes(id));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item) => {
        const isSelected = selected.includes(item.id);
        const Icon = item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, isSelected && styles.cardSelected]}
            activeOpacity={0.8}
            onPress={() => handlePress(item.id)}
          >
            {Icon && (
              <Icon
                size={verticalScale(26)}
                color={light.primary}
                weight={isSelected ? 'fill' : 'regular'}
              />
            )}

            <Typo size={14} fontWeight={'500'} color={light.textPrimary} style={styles.label}>
              {item.label}
            </Typo>

            {isSelected && (
              <View style={styles.check}>
                <Typo size={12} fontWeight={'bold'} color={palette.white}>✓</Typo>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default QuickSettings;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacingX._12,
  },
  card: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: light.primary,
    borderRadius: radius._15,
    paddingVertical: spacingY._20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: light.surface,
    position: 'relative',
  },
  cardSelected: {
    backgroundColor: light.primaryLight,
  },
  label: {
    marginTop: spacingY._7,
  },
  check: {
    position: 'absolute',
    top: spacingY._7,
    right: spacingX._7,
    width: 22,
    height: 22,
    borderRadius: radius._6,
    backgroundColor: light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
