import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from '~/components/layouts/Navbar';
import UserWidget from '~/features/users/UserWidget';
import MyPostWidget from '~/features/posts/MyPostWidget';
import PostsWidget from '~/features/posts/PostsWidget';
import FriendListWidget from '~/features/friends/FriendListWidget';
import AdvertWidget from '~/components/AdvertWidget';

const Home = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const { _id, picturePath } = useSelector((state) => state.auth.user);
  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <Box mb={3}>
            <MyPostWidget picturePath={picturePath} />
          </Box>
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <AdvertWidget />
            <Box m='2rem 0' />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Home;
