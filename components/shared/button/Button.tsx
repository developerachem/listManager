import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../utils/colors';

interface types {
  title: string;
  link?: string;
  loading?: boolean;
  styles?: object;
  outline?: boolean;
  handleButton: any;
}

/**
 *
 * @param Title Required
 * @param Link Required
 * @param Loading Optional
 * @param Styles Optional
 * @param Outline Optional
 * @returns
 */
const Button = ({title, loading, styles, outline, handleButton}: types) => {
  // * Return TSX
  return (
    <TouchableOpacity
      onPress={handleButton}
      style={{
        ...style.button,
        backgroundColor: outline
          ? colors.transparent
          : loading
          ? colors.gray
          : colors.primary,
        ...styles,
      }}
      disabled={loading}>
      <Text style={{color: outline ? colors.primary : colors.white}}>
        {title || 'title not found'}
      </Text>
      {loading && (
        <ActivityIndicator
          size={15}
          color={outline ? colors.primary : colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

// * Styles
const style = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
  },

  content: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
});
