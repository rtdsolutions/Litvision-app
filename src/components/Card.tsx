import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {Pokeball} from './Pokeball';

type Props = {
  name: string;
  id: string;
  children?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  pokeballColor?: 'white' | 'gray';
};

const DEFAULT_COLOR = '#9e9e9e';
const DEFAULT_BACKGROUND = '#f5f5f5';
const WIDTH = Dimensions.get('window').width;

const BuildCard = ({
  id,
  name,
  children,
  pokeballColor,
  color = DEFAULT_COLOR,
  backgroundColor = DEFAULT_BACKGROUND,
}: Props) => {
  const addZeros = useCallback(
    (id: string) => {
      return id.padStart(3, '0');
    },
    [id],
  );

  return (
    <View style={{...styles.container, backgroundColor}}>
      <View style={styles.pokeballWrap}>
        <Pokeball color={pokeballColor} size={130} position={-30} />
      </View>
      {children}
      <Text style={{...styles.text, color}}>{name}</Text>
      <Text style={{...styles.text, ...styles.badge, color}}>
        #{addZeros(id)}
      </Text>
    </View>
  );
};

export const Card = React.memo(BuildCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    position: 'relative',
    width: WIDTH * 0.5 - 20,
    height: 120,
    marginBottom: 15,
    paddingLeft: 10,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: '700',
    zIndex: 2,
    width: '100%',
  },
  pokeballWrap: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 0,
    right: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  badge: {
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,.1)',
    marginTop: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: 'auto',
  },
});
