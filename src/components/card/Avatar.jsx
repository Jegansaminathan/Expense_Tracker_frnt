import Avatar from '@mui/material/Avatar';

function stringToColor(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += (`00${value.toString(16)}`).slice(-2);
  }

  return color;
}

function getAvatarProps(name) {
  const firstLetter = name?.charAt(0)?.toUpperCase() || '?';

  return {
    sx: {
      bgcolor: stringToColor(name || 'User'),
       width: '3em',
    height: '3em',
        fontSize: '28px', 
        fontWeight: 600, 
    },
    children: firstLetter,
  };
}

export default function ProfileAvatar({ name }) {
  return <Avatar {...getAvatarProps(name)} />;
}
