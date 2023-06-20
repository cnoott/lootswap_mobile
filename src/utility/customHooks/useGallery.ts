import {
  cameraRollEventEmitter,
  CameraRoll,
} from '@react-native-camera-roll/camera-roll';

import {useCallback, useEffect, useState} from 'react';

import {AppState, EmitterSubscription, Platform} from 'react-native';

interface GalleryOptions {
  pageSize: number;
  mimeTypeFilter?: Array<string>;
}

interface GalleryLogic {
  photos?: any[];
  albums?: any[];
  loadNextPagePictures: () => void;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  isReloading: boolean;
  hasNextPage: boolean;
}

export const useGallery = ({
  pageSize = 30,
}: GalleryOptions): GalleryLogic => {

  const isAboveIOS14 = Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 14;
  const isAndroid = Platform.OS === 'android';

  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();
  const [photos, setPhotos] = useState<any[]>();
  const [albums, setAlbums] = useState([{title:'Recents'}]);

  const convertPhotosToJpg = async (edges: Array<any>) => {
    const convertedPhotos = await Promise.all(
      edges.map(async edge => {
        if (Platform.OS === 'ios') {
          const imageData = await CameraRoll.iosGetImageDataById(
            edge.node.image.uri,
            true,
          );
          return {uri: imageData.node.image.filepath, key: Math.random() * 100};
        }
        return null;
      })
    );
    return convertedPhotos;
  };

  const loadAlbums = useCallback(async () => {
    const fetchedAlbums = await CameraRoll.getAlbums({
      assetType: 'Photos',
    });
    setAlbums([{title: 'Recents'}, ...fetchedAlbums]);
  }, []);

  const loadNextPagePictures = useCallback(async () => {
    try {
      nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);
      const {edges, page_info} = await CameraRoll.getPhotos({
        first: pageSize,
        after: nextCursor,
        assetType: 'Photos',
      });
      const convertedPhotos = await convertPhotosToJpg(edges);
      setPhotos(
        (prev) => [...(prev ?? []), ...convertedPhotos.filter(Boolean)]
      );

      setNextCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error('useGallery getPhotos error:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingNextPage(false);
    }
  }, [nextCursor, pageSize]);

  const getUnloadedPictures = useCallback(async () => {
    try {
      setIsReloading(true);
      const {edges, page_info} = await CameraRoll.getPhotos({
        first: !photos || photos.length < pageSize ? pageSize : photos.length,
        assetType: 'Photos',
      });
      const newPhotos = convertPhotosToJpg(edges);
      setPhotos(newPhotos.filter(Boolean));

      setNextCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error('useGallery getNewPhotos error:', error);
    } finally {
      setIsReloading(false);
    }
  }, [pageSize, photos]);

  useEffect(() => {
    console.log('loadnextpage')
    if (!photos) {
      loadNextPagePictures();
    }
  }, [loadNextPagePictures, photos]);
  
  /*
  useEffect(() => {
    console.log('loadalbums')
    loadAlbums();
  },[loadAlbums]);
  */

  useEffect(() => {
    console.log('evetn litsten')
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        getUnloadedPictures();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [getUnloadedPictures]);

  useEffect(() => {
    console.log('emitter')
    let subscription: EmitterSubscription;
    if (isAboveIOS14) {
      subscription = cameraRollEventEmitter.addListener('onLibrarySelectionChange', (_event) => {
        getUnloadedPictures();
      });
    }

    return () => {
      if (isAboveIOS14 && subscription) {
        subscription.remove();
      }
    };
  }, [getUnloadedPictures]);

  return {
    photos,
    albums,
    loadNextPagePictures,
    isLoading,
    isLoadingNextPage,
    isReloading,
    hasNextPage,
  };
};

