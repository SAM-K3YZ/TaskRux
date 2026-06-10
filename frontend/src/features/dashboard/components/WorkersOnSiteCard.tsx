import { light, palette, radius, spacingX } from '@/src/constants/theme';
import { WorkersOnSiteCardProps } from '@/src/types';
import { scale, verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Typo from '@/src/shared/components/Typo';


const WorkersOnSiteCard = ({
  number,
  subtext,
  workers = [],
}: WorkersOnSiteCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View style={styles.iconBackground}>
          <Icon.HardHatIcon
            size={verticalScale(20)}
            color={palette.purple}
            weight="bold"
          />
        </View>

        {/* Worker avatars */}
        {workers.length > 0 && (
          <View style={styles.avatars}>
            {workers.slice(0, 2).map((worker, index) => (
              <View
                key={worker.id}
                style={[
                  ,
                  styles.avatarWrapper,
                  { marginLeft: index > 0 ? -10 : 0 },
                ]}
              >
                {worker.image ? (
                  <Image source={{ uri: worker.image }} style={styles.avatar} />
                ) : (
                  // fallback if no image
                  <View style={styles.avatarFallback}>
                    <Typo
                      size={verticalScale(10)}
                      color={palette.white}
                      fontWeight={'bold'}
                    >
                      {worker.name.charAt(0).toUpperCase()}
                    </Typo>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.textArea}>
        <Typo
          size={verticalScale(20)}
          fontWeight={'500'}
          color={light.textPrimary}
        >
          {String(number)}
        </Typo>
        <Typo
          size={verticalScale(14)}
          fontWeight={'regular'}
          color={light.textPrimary}
        >
          {subtext}
        </Typo>
      </View>
    </View>
  );
};

export default WorkersOnSiteCard;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(163),
    width: scale(144),
    borderRadius: radius._12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: spacingX._15,
    justifyContent: 'space-between',
    backgroundColor: light.surface,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBackground: {
    padding: spacingX._5,
    alignSelf: 'flex-start',
    borderRadius: radius._3,
    backgroundColor: palette.purpleLight,
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: verticalScale(28),
    height: verticalScale(28),
    borderRadius: verticalScale(14),
    borderWidth: 2,
    borderColor: light.surface,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.brandOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    gap: 5,
  },
});
