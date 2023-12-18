import React, {memo} from 'react';

import {TouchableOpacity} from 'react-native';
import {SIZES, images} from '../../constants';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {ShowConsoleLogMessage} from '../../utils/Utility';

const RenderGalleryItem = ({
  item,
  index,
  bigGalleryPhotoRef,
  closeGalleryImageModal,
  bigGallery,
}) => {
  // ShowConsoleLogMessage(item);
  let imageUrl = item['200_200']?.url;
  return (
    <TouchableOpacity
      key={imageUrl}
      activeOpacity={0.8}
      onPress={() => {
        setTimeout(() => {
          // ShowConsoleLogMessage('set time out called');
          bigGallery();
        }, 100);
        // bigGalleryPhotoRef?.current?.scrollToOffset({
        //   offset: index * SIZES.width,
        //   animated: true,
        // });

        // ShowConsoleLogMessage(index);
        closeGalleryImageModal();
      }}>
      <BunchDealImageLoader
        defaultImg={images.def_logo}
        source={imageUrl}
        styles={[
          {
            width: SIZES.width / 4.6,
            height: 80,
            alignSelf: 'center',
            marginVertical: 3,
            marginHorizontal: 3,
          },
        ]}
      />
    </TouchableOpacity>
  );
};
export default memo(RenderGalleryItem);
