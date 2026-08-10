import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { APP_THEMES, AppTheme } from '../../constants';
import { styles } from './styles';

type ComponentCategory = 'All' | 'Basics' | 'Forms' | 'Feedback' | 'Navigation';

type ComponentItem = {
  id: string;
  name: string;
  category: Exclude<ComponentCategory, 'All'>;
  description: string;
  status: 'Ready' | 'Draft' | 'Planned';
  tokens: string[];
};

const categories: ComponentCategory[] = [
  'All',
  'Basics',
  'Forms',
  'Feedback',
  'Navigation',
];

const componentItems: ComponentItem[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Basics',
    description: 'Primary, secondary, ghost, disabled, loading, and icon states.',
    status: 'Ready',
    tokens: ['Pressable', 'Accessible', 'Variants'],
  },
  {
    id: 'input',
    name: 'Text Input',
    category: 'Forms',
    description: 'Labels, helper text, validation states, secure text, and prefixes.',
    status: 'Draft',
    tokens: ['Validation', 'Keyboard', 'Focus'],
  },
  {
    id: 'toast',
    name: 'Toast',
    category: 'Feedback',
    description: 'Temporary success, warning, error, and neutral messages.',
    status: 'Planned',
    tokens: ['Timed', 'Stacked', 'Dismissible'],
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Segmented navigation for dense screens and component previews.',
    status: 'Planned',
    tokens: ['Swipe', 'Badges', 'Adaptive'],
  },
];

const MainScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const [selectedCategory, setSelectedCategory] =
    useState<ComponentCategory>('All');
  const [query, setQuery] = useState('');
  const theme = isDark ? APP_THEMES.dark : APP_THEMES.light;

  const filteredComponents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return componentItems.filter(item => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tokens.some(token => token.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const renderComponent: ListRenderItem<ComponentItem> = ({ item }) => (
    <ComponentCard item={item} theme={theme} />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.canvas }]}>
      <FlatList
        data={filteredComponents}
        keyExtractor={item => item.id}
        renderItem={renderComponent}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <View style={[styles.logoMark, { backgroundColor: theme.ink }]}>
                <Text style={[styles.logoText, { color: theme.canvas }]}>RN</Text>
              </View>
              <Text style={[styles.kicker, { color: theme.muted }]}>
                React Native Components
              </Text>
              <Text style={[styles.title, { color: theme.ink }]}>
                Build your component framework from one clean starter.
              </Text>
              <Text style={[styles.subtitle, { color: theme.muted }]}>
                Catalogue every reusable primitive, preview its states, and keep
                implementation notes close while the system grows.
              </Text>
            </View>

            <View
              style={[
                styles.searchBox,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}>
              <Text style={[styles.searchIcon, { color: theme.subtle }]}>/</Text>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search components"
                placeholderTextColor={theme.subtle}
                selectionColor={theme.accent}
                style={[styles.searchInput, { color: theme.ink }]}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}>
              {categories.map(category => {
                const isSelected = category === selectedCategory;
                const categoryTextColor = isSelected ? '#ffffff' : theme.ink;

                return (
                  <Pressable
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: isSelected
                          ? theme.accent
                          : theme.surface,
                        borderColor: isSelected ? theme.accent : theme.border,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.categoryText,
                        { color: categoryTextColor },
                      ]}>
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={[styles.sectionTitle, { color: theme.ink }]}>
                  Component Library
                </Text>
                <Text style={[styles.sectionMeta, { color: theme.muted }]}>
                  {filteredComponents.length} of {componentItems.length} items
                </Text>
              </View>
              <View
                style={[
                  styles.statusPill,
                  { backgroundColor: theme.readySoft },
                ]}>
                <Text style={[styles.statusPillText, { color: theme.ready }]}>
                  Starter
                </Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}>
            <Text style={[styles.emptyTitle, { color: theme.ink }]}>
              No components found
            </Text>
            <Text style={[styles.emptyText, { color: theme.muted }]}>
              Try another search or category, then add your next component to the
              catalogue data.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View
            style={[
              styles.nextPanel,
              { backgroundColor: theme.ink, borderColor: theme.ink },
            ]}>
            <Text style={[styles.nextTitle, { color: theme.canvas }]}>
              Next useful files
            </Text>
            <Text style={[styles.nextText, { color: theme.nextMuted }]}>
              Create folders like src/components, src/tokens, and src/screens as
              this starter graduates into a reusable framework.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const ComponentCard = ({
  item,
  theme,
}: {
  item: ComponentItem;
  theme: AppTheme;
}) => {
  const statusColor = getStatusColor(item.status, theme);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: pressed ? 0.82 : 1,
        },
      ]}>
      <View style={styles.cardTopRow}>
        <View>
          <Text style={[styles.cardCategory, { color: theme.accent }]}>
            {item.category}
          </Text>
          <Text style={[styles.cardTitle, { color: theme.ink }]}>
            {item.name}
          </Text>
        </View>
        <View style={[styles.itemStatus, { backgroundColor: statusColor.soft }]}>
          <Text style={[styles.itemStatusText, { color: statusColor.strong }]}>
            {item.status}
          </Text>
        </View>
      </View>
      <Text style={[styles.cardDescription, { color: theme.muted }]}>
        {item.description}
      </Text>
      <View style={styles.tokenRow}>
        {item.tokens.map(token => (
          <View
            key={token}
            style={[
              styles.token,
              { backgroundColor: theme.token, borderColor: theme.border },
            ]}>
            <Text style={[styles.tokenText, { color: theme.muted }]}>
              {token}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const getStatusColor = (status: ComponentItem['status'], theme: AppTheme) => {
  if (status === 'Ready') {
    return { strong: theme.ready, soft: theme.readySoft };
  }

  if (status === 'Draft') {
    return { strong: theme.warning, soft: theme.warningSoft };
  }

  return { strong: theme.planned, soft: theme.plannedSoft };
};

export default MainScreen;
