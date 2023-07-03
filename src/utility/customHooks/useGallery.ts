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
  selectedAlbum: any;
  onSelectAlbum: Function;
  loadNextPagePictures: () => void;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  isReloading: boolean;
  hasNextPage: boolean;
}

export const useGallery = ({
  pageSize = 15,
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
  const [selectedAlbum, setSelectedAlbum] = useState({title: 'Recents'});

  const convertPhotosToJpgFaster = async (edges: Array<any>) => {
    console.log('faster being called');
    setIsLoading(true);
    const convertedPhotos = await Promise.all(
      edges.map(async edge => {
        if (Platform.OS === 'ios') {
          const imageData = await CameraRoll.iosGetImageDataById(
            edge.node.image.uri,
            false,
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
    setIsLoading(false);
  }, []);

  const onSelectAlbum = async (album: any) => {
    if (album.title === selectedAlbum.title) {
      return;
    }
    setSelectedAlbum(album);
    setNextCursor(undefined);
    nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);
    const {edges, page_info} = await CameraRoll.getPhotos({
      first: 32,
      after: nextCursor,
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: album.title,
    });
    let convertedPhotos = await convertPhotosToJpgFaster(edges);
    setPhotos(convertedPhotos.filter(Boolean));

    setNextCursor(page_info.end_cursor);
    setHasNextPage(page_info.has_next_page);
    setIsLoading(false);
  };

  const loadNextPagePictures = useCallback(async () => {
    console.log('loadnextcalled', selectedAlbum.title);
    try {
      nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);
      const {edges, page_info} = await CameraRoll.getPhotos({
        first: 32,
        after: nextCursor,
        assetType: 'Photos',
        ...(selectedAlbum.title !== 'Recents' && {groupTypes: 'Album'}),
        ...(selectedAlbum.title !== 'Recents' && {groupName: selectedAlbum.title})
      });
      let convertedPhotos = await convertPhotosToJpgFaster(edges);
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
  }, [nextCursor, pageSize, selectedAlbum]);

  const getUnloadedPictures = useCallback(async () => {
    try {
      setIsReloading(true);
      const {edges, page_info} = await CameraRoll.getPhotos({
        first: !photos || photos.length < pageSize ? pageSize : photos.length,
        assetType: 'Photos',
        ...(selectedAlbum.title !== 'Recents' && {groupTypes: 'Album'}),
        ...(selectedAlbum.title !== 'Recents' && {groupName: selectedAlbum.title})
      });
      const newPhotos = await convertPhotosToJpgFaster(edges);
      setPhotos(newPhotos?.filter(Boolean));

      setNextCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
      setIsReloading(false);
      setIsLoading(false);
    } catch (error) {
      console.error('useGallery getNewPhotos error:', error);
    } finally {
      setIsLoading(false);
      setIsReloading(false);
    }
  }, [pageSize, photos, selectedAlbum]);

  useEffect(() => {
    console.log('loadnextpage');
    loadNextPagePictures();
  }, [selectedAlbum]);

  useEffect(() => {
    console.log('loadalbums')
    loadAlbums();
  }, [loadAlbums]);

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
    onSelectAlbum,
    selectedAlbum,
    loadNextPagePictures,
    isLoading,
    isLoadingNextPage,
    isReloading,
    hasNextPage,
  };
};

