import Typo from '@/src/shared/components/Typo';
import Input from '@/src/shared/components/Input';
import RadioInput from '@/src/shared/components/RadioInput';
import { MOCK_PROJECTS, MOCK_WORKERS } from '@/src/shared/data/mockData';
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

const PRIORITIES = ['high', 'medium', 'low'];

const CreateTaskScreen = () => {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [siteId, setSiteId] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');

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
          New Task
        </Typo>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Task title
          </Typo>
          <Input
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
            wrapperStyle={styles.inputWrapper}
          />
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Description
          </Typo>
          <Input
            placeholder="Describe the task..."
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
            Site
          </Typo>
          <View style={styles.radioGroup}>
            {MOCK_PROJECTS.map((project) => (
              <RadioInput
                key={project.id}
                label={project.name}
                value={project.id}
                selectedValue={siteId}
                onPress={setSiteId}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Priority
          </Typo>
          <View style={styles.radioGroup}>
            {PRIORITIES.map((p) => (
              <RadioInput
                key={p}
                label={p.charAt(0).toUpperCase() + p.slice(1)}
                value={p}
                selectedValue={priority}
                onPress={setPriority}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Assignee
          </Typo>
          <View style={styles.radioGroup}>
            {MOCK_WORKERS.map((worker) => (
              <RadioInput
                key={worker.id}
                label={`${worker.name} — ${worker.role}`}
                value={worker.id}
                selectedValue={assigneeId}
                onPress={setAssigneeId}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Typo size={verticalScale(13)} fontWeight={'600'} color={light.textPrimary}>
            Due date
          </Typo>
          <Input
            placeholder="YYYY-MM-DD"
            value={dueDate}
            onChangeText={setDueDate}
            wrapperStyle={styles.inputWrapper}
          />
        </View>

        <Pressable
          style={styles.submitBtn}
          onPress={() =>
            Alert.alert('Coming soon', 'Coming soon — POST /api/tasks')
          }
        >
          <Typo size={verticalScale(15)} fontWeight={'600'} color={light.textOnPrimary}>
            Create Task
          </Typo>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateTaskScreen;

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
