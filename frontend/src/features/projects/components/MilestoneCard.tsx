import { light, radius, spacingX, spacingY } from '@/src/constants/theme';
import { MilestoneCardProps } from '@/src/types';
import { verticalScale, scale } from '@/src/shared/utils/styling';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typo from '@/src/shared/components/Typo';

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = d.getDate().toString().padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

const MilestoneCard = ({ milestone, isLast = false }: MilestoneCardProps) => {
  const { title, date, done } = milestone;

  return (
    <View style={styles.row}>
      <View style={styles.timelineCol}>
        <View
          style={[
            styles.dot,
            done ? styles.dotDone : styles.dotPending,
          ]}
        />
        {!isLast && <View style={styles.line} />}
      </View>

      <View style={styles.content}>
        <Typo
          size={verticalScale(13)}
          fontWeight={done ? '600' : '400'}
          color={done ? light.textPrimary : light.textSecondary}
        >
          {title}
        </Typo>
        <Typo size={verticalScale(11)} color={light.textMuted}>
          {formatDate(date)}
        </Typo>
      </View>
    </View>
  );
};

export default MilestoneCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacingX._12,
  },
  timelineCol: {
    alignItems: 'center',
    width: scale(16),
  },
  dot: {
    width: scale(14),
    height: verticalScale(14),
    borderRadius: radius.full,
    marginTop: verticalScale(2),
  },
  dotDone: {
    backgroundColor: light.primary,
  },
  dotPending: {
    borderWidth: 2,
    borderColor: light.border,
    backgroundColor: light.surface,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: light.border,
    marginTop: spacingY._3,
    marginBottom: spacingY._3,
    minHeight: verticalScale(24),
  },
  content: {
    flex: 1,
    paddingBottom: spacingY._15,
    gap: spacingY._3,
  },
});
