import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#232323',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 6,
  },
  poster: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  imageWrapper: {
    width: 96,
    height: 96,
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default styles
