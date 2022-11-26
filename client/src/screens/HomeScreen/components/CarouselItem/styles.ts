import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  imageWrapper: {
    width: '100%',
    position: 'relative',
  },
  image: {
    borderWidth: 1,
    borderColor: '#fff',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  bottomContent: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    opacity: 0.95,
    marginBottom: 10,
    fontWeight: '600',
  },
  genreList: {
    flexDirection: 'row',
  },
})

export default styles
