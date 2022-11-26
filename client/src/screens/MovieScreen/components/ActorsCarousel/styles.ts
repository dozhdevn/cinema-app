import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  actorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 16,
    width: 192,
    height: 72,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  photo: {
    height: '100%',
    width: 50,
    resizeMode: 'cover',
  },
  nameWrapper: {
    padding: 12,
    width: '91.33333%'
  },
  name: {
    paddingRight: 28,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
})

export default styles
