import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  popularWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'rgb(156, 163, 175)',
    marginTop: 30,
  },
  popularText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  moviesList: {
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieItem: {
    width: 140,
    marginBottom: 10,
  },
  movieCount: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
})

export default styles
