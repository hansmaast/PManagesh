export const baseButtonStyle = {
  position: 'absolute',
  top: '50%',
  borderRadius: 100,
  padding: 0,
  background: 'white',
  color: 'black',
  border: 'none',

};

export const leftButtonStyle = {
  ...baseButtonStyle,
  left: 0,
  transform: 'translate(-150%, -50%)',
};
export const rightButtonStyle = {
  ...baseButtonStyle,
  right: 0,
  transform: 'translate(150%, -50%)',
};

export const plusButton = {
  ...baseButtonStyle,
  position: 'relative'
};