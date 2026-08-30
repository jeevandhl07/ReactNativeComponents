import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  AppHeader,
  Button1,
  Button2,
  Button3,
  Button4,
  Button5,
  Button6,
  Button7,
  Button8,
  Button9,
  Button10,
  Button11,
  Button12,
  Container,
} from '../../components';
import { styles } from './styles';

const ButtonScreen = () => {
  return (
    <Container>
      <AppHeader title="Buttons" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Button Components</Text>
        <Text style={styles.subtitle}>
          Reusable actions for forms, cards, toolbars, and empty states.
        </Text>

        <ButtonSection title="Variants">
          <Button1 />
          <Button2 />
          <Button3 />
          <Button4 />
          <Button5 />
        </ButtonSection>

        <ButtonSection title="Sizes">
          <Button6 />
          <Button1 title="Medium Button" />
          <Button7 />
        </ButtonSection>

        <ButtonSection title="States">
          <Button8 />
          <Button9 />
          <Button10 />
        </ButtonSection>

        <ButtonSection title="With Labels">
          <Button11 />
          <Button3 title="Review Changes" leftLabel="R" />
          <Button12 />
        </ButtonSection>
      </ScrollView>
    </Container>
  );
};

const ButtonSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.buttonStack}>{children}</View>
  </View>
);

export default ButtonScreen;
