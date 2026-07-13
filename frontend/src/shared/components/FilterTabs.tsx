import { light, spacingX, spacingY, radius } from '@/src/constants/theme';
import { FilterTabsProps } from '@/src/types';
import { verticalScale } from '@/src/shared/utils/styling';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Typo from './Typo';

const FilterTabs = ({ tabs, active, onChange }: FilterTabsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Typo
              size={verticalScale(13)}
              fontWeight={isActive ? '600' : '500'}
              color={isActive ? light.textOnPrimary : light.textSecondary}
            >
              {tab}
            </Typo>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacingX._10,
    paddingVertical: spacingY._3,
  },
  tab: {
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._7,
    borderRadius: radius.full,
    backgroundColor: light.surface,
  },
  tabActive: {
    backgroundColor: light.primary,
  },
});
