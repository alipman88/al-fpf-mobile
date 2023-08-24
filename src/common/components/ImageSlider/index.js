import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { SizedImage } from '@components/SizedImage'

export function ImageSlider({ images }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalImageUrl, setModalImageUrl] = useState(false)

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalImageUrl(item.large_url)
          setModalVisible(true)
        }}
      >
        <Image
          source={{ uri: item.thumbnail_url }}
          style={{
            height: 100,
            width: 100,
            marginRight: 6,
          }}
        />
      </TouchableOpacity>
    )
  }

  if (!images) return <></>

  return (
    <>
      <FlatList horizontal={true} data={images} renderItem={renderItem} />
      <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          {modalImageUrl && (
            <SizedImage
              uri={modalImageUrl}
              maxHeight={Dimensions.get('window').height}
              maxWidth={Dimensions.get('window').width}
            />
          )}
        </Pressable>
      </Modal>
    </>
  )
}

ImageSlider.propTypes = {
  images: PropTypes.array,
}
