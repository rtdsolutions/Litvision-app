import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDebounce} from '../hooks/useDebounce';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onDebounce: (value: string) => void;
  onSubmit: () => void;
  style: object;
}

export const SearchInput = ({onDebounce, onSubmit, style}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      onDebounce(debouncedValue);
    }
    return () => {
      isMounted = false;
    };
  }, [debouncedValue]);

  return (
    <View style={style}>
      <TextInput
        placeholder="Search Pokemon"
        placeholderTextColor="white"
        autoCorrect={false}
        autoCapitalize="none"
        style={{
          borderColor: 'white',
          color: 'white',
          borderWidth: 2,
          borderRadius: 6,
          padding: 10,
          width: 170,
        }}
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <TouchableOpacity style={{padding: 5}} onPress={onSubmit}>
        <Icon style={{color: 'white'}} name="search" size={25} color="#000" />
      </TouchableOpacity>
    </View>
  );
};
