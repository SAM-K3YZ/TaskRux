import { light, palette, radius, spacingX, spacingY } from '@/constants/theme';
import { TeamMemberCardProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import * as Icons from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Typo from './Typo';

const ROLES = [
  {
    value: 'supervisor',
    label: 'Supervisor',
    description: 'Can manage tasks and oversee daily site reports.',
  },
  {
    value: 'project_manager',
    label: 'Project Manager',
    description: 'Oversees entire project scope and team coordination.',
  },
  {
    value: 'worker',
    label: 'Worker',
    description: 'Assigned to tasks and can log daily progress.',
  },
  {
    value: 'viewer',
    label: 'Viewer',
    description: 'Read-only access to project updates.',
  },
];

function TeamMemberCard({
  member,
  index,
  isFirst,
  onRemove,
  onUpdate,
}: TeamMemberCardProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const selectedRole = ROLES.find((r) => r.value === member.role);
  //const validDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  // const hasEmail = member.email.includes("@") && validDomains.some((domain) => member.email.endsWith(domain));
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email);

  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Typo size={14} fontWeight={'600'} color={light.textPrimary}>
          Member #{index + 1}
        </Typo>
        {!isFirst && (
          <TouchableOpacity onPress={() => onRemove(member.id)}>
            <Icons.XIcon size={verticalScale(18)} color={palette.neutral400} />
          </TouchableOpacity>
        )}
      </View>

      {/* Email Input */}
      <View style={styles.field}>
        <Typo
          size={11}
          fontWeight={'600'}
          color={palette.neutral500}
          style={styles.fieldLabel}
        >
          EMAIL ADDRESS
        </Typo>
        <View style={[styles.inputRow, isFocused && styles.inputFocused]}>
          <Icons.EnvelopeSimpleIcon
            size={verticalScale(16)}
            color={palette.neutral400}
          />
          <TextInput
            style={styles.textInput}
            placeholder="colleague@construction.co"
            placeholderTextColor={palette.neutral400}
            value={member.email}
            onChangeText={(val) => onUpdate(member.id, 'email', val)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {hasEmail && (
            <Icons.CheckCircleIcon
              size={verticalScale(18)}
              color={light.primary}
              weight="fill"
            />
          )}
        </View>
      </View>

      {/* Role Selector */}
      <View style={styles.field}>
        <View style={styles.roleHeader}>
          <Typo
            size={11}
            fontWeight={'600'}
            color={palette.neutral500}
            style={styles.fieldLabel}
          >
            ROLE
          </Typo>
          <TouchableOpacity>
            <Typo size={11} color={light.primaryDark} fontWeight={'600'}>
              ⓘ Role Guide
            </Typo>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownOpen(!dropdownOpen)}
        >
          <Typo size={15} color={light.textPrimary}>
            {selectedRole?.label ?? 'Select a role'}
          </Typo>
          <Icons.CaretDownIcon
            size={verticalScale(18)}
            color={palette.neutral500}
            weight="bold"
          />
        </TouchableOpacity>

        {/* Role description */}
        {selectedRole?.description && !dropdownOpen && (
          <Typo size={12} color={palette.neutral500} style={styles.roleDesc}>
            {selectedRole.description}
          </Typo>
        )}

        {/* Dropdown Options */}
        {dropdownOpen && (
          <View style={styles.dropdownList}>
            {ROLES.map((role) => (
              <Pressable
                key={role.value}
                style={[
                  styles.dropdownItem,
                  member.role === role.value && styles.dropdownItemActive,
                ]}
                onPress={() => {
                  onUpdate(member.id, 'role', role.value);
                  setDropdownOpen(false);
                }}
              >
                <Typo
                  size={14}
                  color={
                    member.role === role.value
                      ? light.primary
                      : light.textPrimary
                  }
                  fontWeight={member.role === role.value ? '600' : '400'}
                >
                  {role.label}
                </Typo>
                {member.role === role.value && (
                  <Icons.CheckIcon
                    size={verticalScale(16)}
                    color={light.primary}
                    weight="bold"
                  />
                )}
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export default TeamMemberCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: light.surface,
    borderRadius: radius._15,
    padding: spacingX._15,
    gap: spacingY._12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  field: {
    gap: spacingY._7,
  },
  fieldLabel: {
    letterSpacing: 0.5,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.neutral200,
    borderRadius: radius._10,
    paddingHorizontal: spacingX._12,
    height: verticalScale(46),
    gap: spacingX._7,
    backgroundColor: palette.neutral100,
  },
  inputFocused: {
    borderColor: light.primary,
  },
  textInput: {
    flex: 1,
    fontSize: verticalScale(14),
    color: light.textPrimary,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.neutral200,
    borderRadius: radius._10,
    paddingHorizontal: spacingX._15,
    height: verticalScale(46),
    backgroundColor: palette.neutral100,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: palette.neutral200,
    borderRadius: radius._10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._12,
    borderBottomWidth: 1,
    borderBottomColor: palette.neutral100,
  },
  dropdownItemActive: {
    backgroundColor: light.primaryLight,
  },
  roleDesc: {
    paddingLeft: spacingX._5,
  },
});
