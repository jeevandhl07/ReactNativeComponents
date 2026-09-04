import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from '../../assets/icon';
import images from '../../assets/images';
import { Container } from '../../components';
import { APP_THEMES, AppTheme } from '../../constants';
import { MainStackParamList } from '../../navigation/types';
import { styles } from './styles';

type ComponentItem = {
  id: string;
  name: string;
  category: 'Navigation';
  description: string;
  tokens: string[];
  routeName?: keyof MainStackParamList;
};

const componentItems: ComponentItem[] = [
  {
    id: 'bottom-sheet',
    name: 'Bottom Sheet',
    category: 'Navigation',
    description:
      'Snap-up surface with backdrop dismissal, drag handling, and actions.',
    tokens: ['Gesture', 'Modal', 'Safe Area'],
    routeName: 'BottomSheetScreen',
  },
];

const MainScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const [query, setQuery] = useState('');
  const theme = isDark ? APP_THEMES.dark : APP_THEMES.light;

  const filteredComponents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return componentItems.filter(item => {
      return (
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tokens.some(token => token.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [query]);

  const renderComponent: ListRenderItem<ComponentItem> = ({ item }) => (
    <ComponentCard
      item={item}
      theme={theme}
      onPress={() => {
        if (item.routeName) {
          navigation.navigate(item.routeName);
        }
      }}
    />
  );

  return (
    <Container>
      <FlatList
        data={filteredComponents}
        keyExtractor={item => item.id}
        renderItem={renderComponent}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <View style={styles.header}>
                <Image source={images.logo} style={styles.logoImage} />
                <Text style={[styles.kicker, { color: theme.muted }]}>
                  React Native Components
                </Text>
              </View>
              <Text style={[styles.title, { color: theme.ink }]}>
                Component Framework
              </Text>
              <Text style={[styles.subtitle, { color: theme.muted }]}>
                Search, preview, and ship reusable RN building blocks.
              </Text>
            </View>

            <View
              style={[
                styles.searchBox,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <Icon
                type="ion"
                name="search"
                color={theme.subtle}
                size={22}
                style={styles.searchIcon}
              />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search components"
                placeholderTextColor={theme.subtle}
                selectionColor={theme.accent}
                style={[styles.searchInput, { color: theme.ink }]}
              />
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={[styles.sectionTitle, { color: theme.ink }]}>
                  Component Library
                </Text>
                <Text style={[styles.sectionMeta, { color: theme.muted }]}>
                  {filteredComponents.length} of {componentItems.length} items
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
            ]}
          >
            <Text style={[styles.emptyTitle, { color: theme.ink }]}>
              No components found
            </Text>
            <Text style={[styles.emptyText, { color: theme.muted }]}>
              Try another search or category, then add your next component to
              the catalogue data.
            </Text>
          </View>
        }
      />
    </Container>
  );
};

const ComponentCard = ({
  item,
  theme,
  onPress,
}: {
  item: ComponentItem;
  theme: AppTheme;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: pressed ? 0.82 : 1,
        },
      ]}
    >
      <View style={styles.cardTopRow}>
        <View>
          <Text style={[styles.cardCategory, { color: theme.accent }]}>
            {item.category}
          </Text>
          <Text style={[styles.cardTitle, { color: theme.ink }]}>
            {item.name}
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
            ]}
          >
            <Text style={[styles.tokenText, { color: theme.muted }]}>
              {token}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
};

export default MainScreen;
