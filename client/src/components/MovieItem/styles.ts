import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  movie: {
    width: 160,
    height: 224,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24
  },
  favoriteButtonWrapper: {
    position: 'absolute',
    right: 6,
    top: 6,
    zIndex: 1,
  },
  blur: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 2,
    paddingHorizontal: 8,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
})

export default styles
