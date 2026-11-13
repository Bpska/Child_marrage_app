import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';

interface SectionCardProps {
  title?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'accent' | 'warning' | 'quote';
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  iconColor = Colors.primary,
  children,
  style,
  variant = 'default',
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'warning':
        return styles.warningCard;
      case 'quote':
        return styles.quoteCard;
      case 'accent':
        return styles.accentCard;
      default:
        return styles.defaultCard;
    }
  };

  return (
    <View style={[styles.card, getVariantStyle(), style]}>
      {title ? (
        <View style={styles.headerRow}>
          {icon && (
            <View style={[styles.iconBadge, { backgroundColor: `${iconColor}15` }]}>
              <Ionicons name={icon} size={20} color={iconColor} />
            </View>
          )}
          <Text style={[styles.title, icon ? { flex: 1 } : null]}>{title}</Text>
        </View>
      ) : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  defaultCard: {
    backgroundColor: Colors.white,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  accentCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
  },
  warningCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  quoteCard: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderLeftWidth: 5,
    borderLeftColor: Colors.rightsLaws,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  body: {
    marginTop: 2,
  },
});

export default SectionCard;

