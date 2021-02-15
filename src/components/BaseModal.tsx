import React from 'react';
import { View, StyleSheet } from 'react-native';

export const BaseModal: React.FC = ({ children }) => {
  return <View style={styles.modalWrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  modalWrapper: {
    padding: 20,
    flex: 1,
  },
});
