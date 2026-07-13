import Typo from '@/src/shared/components/Typo';
import Input from '@/src/shared/components/Input';
import RadioInput from '@/src/shared/components/RadioInput';
import { light, radius, spacingX, spacingY } from '@/src/constants/theme';
import { verticalScale } from '@/src/shared/utils/styling';
import * as Icon from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'planning', label: 'Planning' },
  { value: 'onHold', label: 'On Hold' },
];

const CreateProjectScreen = () => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('planning');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Icon.ArrowLeftIcon size={verticalScale(22)} color={light.textPrimary} />
        </Pressable>
        <Typo size={verticalScale(16)} color={light.textPrimary} fontWeight={'bold'}>
          New Project
        </Typo>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Project name
          </Typo>
          <Input
            placeholder="Enter project name"
            value={name}
            onChangeText={setName}
            wrapperStyle={styles.inputWrapper}
          />
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Address
          </Typo>
          <Input
            placeholder="Site address"
            value={address}
            onChangeText={setAddress}
            wrapperStyle={styles.inputWrapper}
          />
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Description
          </Typo>
          <Input
            placeholder="Describe the project..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            wrapperStyle={styles.inputWrapper}
            containerStyle={styles.multilineContainer}
            inputStyle={styles.multilineInput}
          />
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Status
          </Typo>
          <View style={styles.radioGroup}>
            {STATUSES.map((s) => (
              <RadioInput
                key={s.value}
                label={s.label}
                value={s.value}
                selectedValue={status}
                onPress={setStatus}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Budget
          </Typo>
          <Input
            placeholder="e.g. 45000000"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
            wrapperStyle={styles.inputWrapper}
          />
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Deadline
          </Typo>
          <Input
            placeholder="YYYY-MM-DD"
            value={deadline}
            onChangeText={setDeadline}
            wrapperStyle={styles.inputWrapper}
          />
        </View>

        <Pressable
          style={styles.submitBtn}
          onPress={() =>
            Alert.alert('Coming soon', 'Coming soon — POST /api/projects')
          }
        >
          <Typo size={verticalScale(15)} fontWeight={'600'} color={light.textOnPrimary}>
            Create Project
          </Typo>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._10,
  },
  backBtn: {
    marginRight: spacingX._12,
  },
  headerRight: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._80,
    gap: spacingY._20,
  },
  field: {
    gap: spacingY._10,
  },
  inputWrapper: {
    flex: 0,
  },
  multilineContainer: {
    height: verticalScale(100),
    alignItems: 'flex-start',
    paddingVertical: spacingY._10,
    borderRadius: radius._15,
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: verticalScale(80),
  },
  radioGroup: {
    gap: spacingY._10,
  },
  submitBtn: {
    backgroundColor: light.primary,
    borderRadius: radius.full,
    paddingVertical: spacingY._15,
    alignItems: 'center',
    marginTop: spacingY._10,
  },
});
