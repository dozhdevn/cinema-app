import { View, Text } from 'react-native'
import React from 'react'
import InputControl from '../../../../components/InputControl'
import { SearchFormData } from '../../../../interfaces'
import { Control } from 'react-hook-form'
import AdminCreateButton from '../AdminCreateButton'

interface AdminSearchProps {
  control: Control<SearchFormData>
  onPress?: () => void
}

const AdminSearch: React.FC<AdminSearchProps> = ({ control, onPress }) => {
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ width: onPress ? '80%' : '100%' }}>
        <InputControl<SearchFormData>
          placeholder="Type something..."
          control={control}
          name="searchTerm"
        />
      </View>

      {onPress && <AdminCreateButton onPress={onPress} />}
    </View>
  )
}

export default AdminSearch
