import { Router } from 'expo-router';
import React, { ReactNode } from 'react';
import {
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  children: any | null;
  style?: TextStyle;
  textProps?: TextProps;
  numberOfLines?: number;
};

export interface UserProps {
  email: string;
  name: string;
  avatar?: string | null;
  id?: string;
  // Add any additional fields from the token payload as needed
}
export interface UserDataProps {
  name: string;
  email: string;
  avatar?: any;
}

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
  label?: string;
  helpText?: string;
  labelStyle?: TextStyle;
  helpTextStyle?: TextStyle;
  onHelpTextPress?: () => void;
  inputType?: 'text' | 'password' | 'number';
  //   error?: string;
}

export interface ActiveProjectCardProps {
  icon?: React.ReactNode;
  iconBgStyle?: ViewStyle;
  newProjectNumber?: number;
  number?: number;
  subtext?: string;
}

export interface OpenIssuesCardProps {
  icon?: React.ReactNode;
  iconBgStyle?: string;
  newProjectNumber?: number;
  number?: number;
  subtext?: string;
}

export interface WorkersOnSiteCardProps {
  number: number;
  subtext: string;
  workers?: WorkerAvatarProps[];
}

export interface WorkerAvatarProps {
  id: string;
  image?: string;
  name: string;
}
export interface WorkerTaskCardProps {
  task?: string;
  time?: string | Date;
  worker?: WorkerAvatarProps;
}

export interface WorkReportCardProps {
  title?: string;
  site?: string;
  time?: string | Date;
  worker?: WorkerAvatarProps;
}

// Add to your types file
export type ReportStatus = 'submitted' | 'pending';
export type DeliveryType = 'material' | 'machine';
export type DeliveryStatus = 'success' | 'warning' | 'delayed';
export type ProjectStatus = 'active' | 'onHold' | 'planning';

export interface ReportCardProps {
  title: string;
  site: string;
  time: string | Date;
  status: ReportStatus;
}

export interface DeliveryCardProps {
  title: string;
  site: string;
  time: string | Date;
  type: DeliveryType;
  status: DeliveryStatus;
}

export interface SiteOverviewCardProps {
  siteName: string;
  address: string;
  mapImage?: string | number;
  onPress?: () => void;
}

export interface Member {
  id: string;
  email: string;
  role: string;
}

export interface TeamMemberCardProps {
  member: Member;
  index: number;
  isFirst?: boolean;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: 'email' | 'role', value: string) => void;
}

export interface AddMemberButtonProps {
  onPress: () => void;
}

export type QuickSettingItem = {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
};

export interface QuickSettingsProps {
  items: QuickSettingItem[];
  selected: string[];
  onToggle: (id: string, checked: boolean) => void;
  containerStyle?: ViewStyle;
}

export interface DecodedTokenProps {
  user: UserProps;
  exp: number;
  iat: number;
}

export interface RadioInputProps {
  label: string;
  value: string;
  selectedValue: string;
  onPress: (value: string) => void;
  icon?: React.ComponentType<any>;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

export interface ProjectCardProps{
  projectName: string,
  address: string,
  status: ProjectStatus;
}

export type AuthContextProps = {
  token: string | null;
  user: UserProps | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    avatar?: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateToken: (token: string) => Promise<void>;
};

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
  isModal?: boolean;
  showBg?: boolean;
  bgOpacity?: number;
};

export type ResponseProps = {
  success: boolean;
  data?: any;
  msg?: string;
};

export interface ButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export type BackButtonProps = {
  style?: ViewStyle;
  color?: string;
  iconSize?: number;
};

export type DotProp = {
  style?: ViewStyle;
};

export type AvatarProps = {
  size?: number;
  uri: string | null;
  style?: ViewStyle;
  isGroup?: boolean;
};

export type HeaderProps = {
  title?: string;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type ConversationListItemProps = {
  item: ConversationProps;
  showDivider: boolean;
  isGroup?: boolean;
  router: Router;
};

export type ConversationProps = {
  _id: string;
  type: 'direct' | 'group';
  avatar: string | null;
  participants: {
    _id: string;
    name: string;
    avatar: string;
    email: string;
  }[];
  name?: string;
  lastMessage?: {
    _id: string;
    content: string;
    senderId: string;
    type: 'text' | 'image' | 'file';
    attachment?: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type MessageProps = {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
  };
  content: string;
  attachement?: string | null;
  isMe?: boolean;
  createdAt: string;
};

export type TaskStatus = 'pending' | 'in_progress' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';
export type WorkerStatus = 'on_site' | 'off_site';
export type NotificationType = 'task' | 'report' | 'delivery' | 'worker' | 'project';

export interface Worker {
  id: string;
  name: string;
  role: string;
  site: string;
  siteId: string;
  status: WorkerStatus;
  phone: string;
  email: string;
  startDate: string;
  taskCount: number;
  avatar: string | null;
}

export interface Project {
  id: string;
  name: string;
  address: string;
  status: ProjectStatus;
  progress: number;
  workerCount: number;
  taskCount: number;
  deadline: string;
  budget: string;
  spent: string;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  site: string;
  siteId: string;
  assigneeId: string;
  assigneeName: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  description: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  done: boolean;
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  relatedId: string;
}

export interface FilterTabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  style?: ViewStyle;
}

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconBg?: string;
  style?: ViewStyle;
}

export interface NotificationCardProps {
  item: AppNotification;
  onPress: () => void;
}

export interface WorkerCardProps {
  worker: Worker;
  onPress: () => void;
}

export interface MilestoneCardProps {
  milestone: Milestone;
  isLast?: boolean;
}
