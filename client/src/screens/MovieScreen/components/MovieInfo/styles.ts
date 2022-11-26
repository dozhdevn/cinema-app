import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  movieWrapper: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
    color: '#F9FCFC',
    marginBottom: 8,
    paddingRight: 8
  },
  infoWrapper: {
    flexDirection: 'row'
  },
  text: {
    color: '#ffffff',
    marginHorizontal: 4,
    fontSize: 18
  },
  genres: {
    flexDirection: 'row',
    marginTop: 10
  },
  dot: {
    marginLeft: 4,
  }
})

export default styles
