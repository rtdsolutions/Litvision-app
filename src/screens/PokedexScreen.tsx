import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import SplashScreen from 'react-native-splash-screen';

import {usePokemons} from '../hooks/usePokemons';
import {PokedexItem} from '../components/PokedexItem';
import {Pokeball} from '../components/Pokeball';
import {Spinner} from '../components/Spinner';

import {colors} from '../theme/colors';
import {SearchInput} from '../components/SearchInput';
import {useNavigation} from '@react-navigation/native';
import {getImageColors} from '../utils/getColors';

export const PokedexScreen = () => {
  const {totalPages, pokemons, getPokemons, status, loading, searchPokemon} =
    usePokemons();
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const {navigate} = useNavigation();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      SplashScreen.hide();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => {
        getPokemons(prevPage + 1);
        return prevPage + 1;
      });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => {
        getPokemons(prevPage - 1);
        return prevPage - 1;
      });
    }
  };

  const handleSearch = async () => {
    if (term) {
      const item = await searchPokemon(term);
      if (item) {
        const [color] = await getImageColors(item.picture);
        navigate('Pokemon', {
          pokemonItem: item,
          color: color ?? '#f5f5f5',
        });
      }
    }
  };

  if (status === 'loading' && pokemons.length === 0) {
    return <Spinner />;
  }

  if (status === 'error' || (status === 'success' && pokemons.length === 0)) {
    return (
      <View style={styles.withoutResults}>
        <Text style={styles.withoutResultText}>
          At this time there are no pokemons available.
        </Text>
        <Image
          style={styles.withoutResultImg}
          source={require('../assets/pokeball-white.png')}
        />
      </View>
    );
  }

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={pokemons}
          keyExtractor={pokemon => pokemon.id}
          renderItem={({item}) => <PokedexItem item={item} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
          removeClippedSubviews
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
          ListHeaderComponent={
            <View>
              <View style={styles.titleContainer}>
                <Pokeball size={180} position={-50} />
                <Text style={styles.title}>Pokédex</Text>
                <SearchInput
                  style={styles.search}
                  onDebounce={setTerm}
                  onSubmit={handleSearch}
                />
              </View>
              <View style={styles.pagination}>
                <Button
                  title="Prev"
                  onPress={handlePreviousPage}
                  disabled={page === 1}
                />
                <Text style={styles.pageText}>
                  {page} / {totalPages}
                </Text>
                <Button
                  title="Next"
                  onPress={handleNextPage}
                  disabled={page === totalPages}
                />
              </View>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 90,
  },
  titleContainer: {
    position: 'relative',
    backgroundColor: colors.red,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#fff',
  },
  withoutResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
  },
  withoutResultText: {
    fontSize: 25,
    width: '80%',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  withoutResultImg: {
    width: 150,
    height: 150,
    opacity: 0.9,
  },
  search: {
    position: 'absolute',
    right: 0,
    padding: 15,
    width: 230,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  pageText: {
    fontSize: 16,
    color: 'white',
  },
});
